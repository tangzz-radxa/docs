---
sidebar_position: 105
---

# 常见问题

## 系统问题

### 系统无法启动

检查下载的系统镜像是否正确以及是否解压，烧录工具选择的镜像文件是解压后的文件。

说明：若以上检查无误，可以尝试重新下载系统镜像，避免下载不完整。

## 远程问题

### SSH 无法远程

出厂系统镜像默认开启 SSH 服务，一般情况下，您只需要确保 Cubie A7S 和 PC 端处于同一局域网，即可通过 SSH 远程。

排查方法：

1. 检查 Cubie A7S 是否连接到网络以及 IP 地址是否正确：使用 `ip a` 命令可以查看网络连接的详细信息。
2. 检查 Cubie A7S 和 PC 端是否处于同一局域网：使用 `ping` 彼此 IP 地址测试是否可以 ping 通。
3. 检查 SSH 服务是否启动：使用 `sudo systemctl status ssh` 命令查看 SSH 服务状态。

### VNC 无法远程

VNC 远程需要您手动配置 VNC 服务器；若按照教程操作，每次重启或者关机后，VNC 服务器都会自动关闭。

排查方法：

1. 按照教程完成 VNC 远程的配置。
2. 确保 SSH 远程一切正常。
3. 检查是否启动 VNC 服务器：使用 `vncserver -list` 命令查看 VNC 服务器是否启动。
4. 使用 `ip:5901` 进行 VNC 远程，其中 `ip` 是 Cubie A7S 的 IP 地址。

## 串口问题

### 打开串口设备失败

若打开串口出现 `Error: Permission denied, cannot open /dev/ttyUSB0` 错误提示！

您可以按照以下步骤排查问题：

1. 检查串口设备是否正确连接 PC

2. 检查串口设备权限

以 Linux 系统为例，若串口设备权限不足，您需要在终端命令行运行以下命令，让当前用户有权限访问设备。

- 查看串口设备信息

以 `/dev/ttyUSB0` 作为演示：

<NewCodeBlock tip="Linux$" type="host">

```bash
ls -l /dev/ttyUSB0
```

</NewCodeBlock>

若系统存在该设备，您会看到类似以下的输出：

```text
crw-rw---- 1 root dialout 188, 0 Sep 10 21:24 /dev/ttyUSB0
```

- 添加当前用户到 `dialout` 组

<NewCodeBlock tip="Linux$" type="host">

```bash
sudo usermod -a -G dialout $USER
```

</NewCodeBlock>

- 重新登录

<NewCodeBlock tip="Linux$" type="host">

```bash
newgrp dialout
```

</NewCodeBlock>

3. 检查串口设备是否被其他程序占用

## 网络带宽测试

### 端口占用

若系统提示 `iperf3: error - unable to start listener for connections: Address already in use`，说明 iperf3 进程占用了 5201 端口。

解决办法：

1. 查看 iperf3 的进程

<NewCodeBlock tip="Linux@host$" type="device">

```bash
ps -ef | grep iperf3
```

</NewCodeBlock>

2. 终止 iperf3 进程：将 `<PID>` 替换为 iperf3 进程的 PID。

<NewCodeBlock tip="Linux@host$" type="device">

```bash
sudo kill <PID>
```

</NewCodeBlock>

## KDE Discover 无法使用

KDE Discover 默认使用 OpenGL 渲染，而当前 GPU 驱动不支持 OpenGL 渲染，导致 KDE Discover 无法使用，解决方案：直接使用 apt 命令行工具安装软件包。

<NewCodeBlock tip="Linux@host$" type="device">
```bash
sudo apt search <package_name>
sudo apt install <package_name>
```
</NewCodeBlock>

apt 可以模糊搜索软件包，在使用 apt install 命令时，可以使用 tab 键自动补全软件包名称。

例如，安装 VLC 媒体播放器：

<NewCodeBlock tip="Linux@host$" type="device">
```bash
sudo apt search vlc
sudo apt install vlc
```
</NewCodeBlock>

## 已知问题与限制

本节说明当前 Cubie A7S 官方 BSP 上已确认存在、但尚未在主线内核中完全修复的限制。请在评估方案、选型与系统镜像时纳入考量。

### GPU 加速不可用

Cubie A7S 使用的全志 A733 SoC 集成 Imagination PowerVR BXM-4-64 GPU，IP 层支持 OpenGL ES 3.2 / Vulkan 1.3 / OpenCL 3.0，但当前 BSP 内核驱动暂未提供完整的 OpenGL 渲染管线。Chromium / Chrome 等浏览器无法使用 GPU 硬件加速，`chrome://gpu` 中所有功能均显示为 Software only；KMS / WebGL 等场景同样受限。

影响范围与建议：

- **KDE Discover**：默认使用 OpenGL 渲染。请改用 `apt` 命令行安装软件。
- **Chromium / Chrome**：硬件加速、WebGL、硬件解码均不可用。如对浏览器 GPU 加速有强需求，请关注后续 BSP 完善情况。
- **其他依赖 GL 加速的桌面特效 / 合成器**：可能无法正常工作或只能软渲染。

### USB-C DisplayPort Alt Mode 限制

USB-C 接口支持 DisplayPort 1.4 Alt Mode 输出，常见 1080p / 4K 显示器可正常显示。但根据用户与开发团队对当前 BSP 的实测，存在以下已知限制：

- **热插拔（Hot-Plug）检测不可用**：在 DP-Alt 路径上，显示器必须在开机前已经连接；如果开机后再插入 / 拔出 / 切换显示器，HPD 不会重新检测到信号，画面可能无输出。
- **不同启动之间显示稳定性可能不一致**：相同硬件与镜像在两次启动中可能出现一次正常、一次黑屏的情况。
- **高带宽下可能出现链路训练失败**：当 sink 协商出 HBR2（5.4 Gbps）速率时，当前驱动没有 clock-recovery 失败后的回退路径，可能导致黑屏。

建议：

- 需要长时间运行的显示场景，**确保显示器在开机前已连接**，并尽量避免热插拔。
- 如对显示稳定性有较高要求，请使用 [下载页面](./download) 上的最新 Radxa OS 镜像；Debian 11 / Linux 5.15 镜像目前是较稳定的 LTS 选择，相关修复会优先在该分支验证。
- 在新镜像 / 第三方 BSP（Armbian、Fedora 等）上遇到 DP-Alt 异常时，请先确认显示器连接顺序与分辨率，再反馈对应的镜像版本与启动日志。

### 控制台 fbdev 回退

新版本的镜像默认不再提供 U-Boot 显示 hand-off。如果开机后看不到 `/dev/fb0`、systemd 启动时控制台回退到 `dummy` 设备，可以改用 `kmscon` 直接通过 KMS 显示控制台：

<NewCodeBlock tip="Linux@host$" type="device">

```bash
sudo apt install kmscon
sudo systemctl enable --now kmscon
```

</NewCodeBlock>

## 镜像版本与选型

当前 Cubie A7S 提供的官方系统镜像主要包括（具体版本以 [下载页面](./download) 为准）：

- **Radxa OS（Debian 11 / Linux 5.15）**：推荐用于生产与长时间运行；GPU / DP / 控制台相关修复较完整。
- **Radxa OS Lite（Debian 11 / Linux 5.15）**：无桌面环境，适用于嵌入式定制。
- **Debian 13 测试镜像（含 `trixie_cli_beta_v2` 等）**：用于验证新功能与新内核，相关补丁正在持续合入，可能仍存在 GPU / DP 相关问题。
- **Buildroot / Tina Linux**：适用于深度嵌入式定制，行为与 Debian 镜像可能不同。

如对 GPU 加速、DP-Alt 输出或控制台行为有强需求，建议在评估前先确认所使用镜像的内核版本与发布日期。
