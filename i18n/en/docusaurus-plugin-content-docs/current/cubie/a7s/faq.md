---
sidebar_position: 105
---

# Frequently Asked Questions

## System

### The system does not boot

Verify that you downloaded the correct image, that it is fully downloaded, and that you flashed the _decompressed_ image (not the compressed archive).

If everything looks correct, try downloading the image again to avoid partial downloads.

## Remote access

### SSH does not work

Factory images enable SSH by default. In most cases, you only need to make sure Cubie A7S and your PC are on the same LAN, then connect via SSH.

Troubleshooting:

1. Check Cubie A7S network connectivity and IP address: use `ip a`.
2. Confirm Cubie A7S and your PC are on the same LAN: `ping` each other.
3. Check whether SSH service is running: `sudo systemctl status ssh`.

### VNC does not work

VNC requires manual server configuration. If you follow the tutorial, note that the VNC server will stop after every reboot or shutdown.

Troubleshooting:

1. Complete the VNC configuration steps in the tutorial.
2. Make sure SSH works first.
3. Check whether the VNC server is running: `vncserver -list`.
4. Connect to `ip:5901` where `ip` is the Cubie A7S IP address.

## Serial console

### Cannot open the serial device

If you see `Error: Permission denied, cannot open /dev/ttyUSB0`:

Try the following:

1. Check that the USB‑to‑UART adapter is correctly connected to the PC.

2. Check device permissions.

On Linux, if you do not have permission to access the device, run the following to grant access.

- View device info

For example, using `/dev/ttyUSB0`:

<NewCodeBlock tip="Linux$" type="host">

```bash
ls -l /dev/ttyUSB0
```

</NewCodeBlock>

If the device exists, you will see output similar to:

```text
crw-rw---- 1 root dialout 188, 0 Sep 10 21:24 /dev/ttyUSB0
```

- Add your user to the `dialout` group

<NewCodeBlock tip="Linux$" type="host">

```bash
sudo usermod -a -G dialout $USER
```

</NewCodeBlock>

- Re-login (or refresh group membership)

<NewCodeBlock tip="Linux$" type="host">

```bash
newgrp dialout
```

</NewCodeBlock>

3. Check whether the serial device is in use by another program.

## Network bandwidth testing

### Port already in use

If you see `iperf3: error - unable to start listener for connections: Address already in use`, an `iperf3` process is already using port 5201.

Fix:

1. Find the `iperf3` process

<NewCodeBlock tip="Linux@host$" type="device">

```bash
ps -ef | grep iperf3
```

</NewCodeBlock>

2. Kill the `iperf3` process (replace `<PID>` with the actual PID)

<NewCodeBlock tip="Linux@host$" type="device">

```bash
sudo kill <PID>
```

</NewCodeBlock>

## KDE Discover does not work

KDE Discover uses OpenGL rendering by default. If the current GPU driver does not support OpenGL rendering, KDE Discover may not work. Use `apt` in the terminal to install packages instead.

<NewCodeBlock tip="Linux@host$" type="device">
```bash
sudo apt search <package_name>
sudo apt install <package_name>
```
</NewCodeBlock>

`apt` supports fuzzy searching. When using `apt install`, you can press `Tab` to auto-complete package names.

For example, to install VLC:

<NewCodeBlock tip="Linux@host$" type="device">
```bash
sudo apt search vlc
sudo apt install vlc
```
</NewCodeBlock>

## Known issues and limitations

This section describes limitations that are confirmed on the current Cubie A7S official BSP but are not yet fully fixed in the upstream kernel. Please take them into account when selecting the platform, planning bring-up, and choosing an image.

### GPU acceleration is not available

The Allwinner A733 SoC on Cubie A7S integrates an Imagination PowerVR BXM-4-64 GPU. The IP layer supports OpenGL ES 3.2, Vulkan 1.3, and OpenCL 3.0, but the current BSP kernel driver does not yet expose a full OpenGL rendering pipeline. As a result, Chromium / Chrome cannot use hardware acceleration: every feature in `chrome://gpu` is reported as Software only. KMS, WebGL, and similar use cases are affected as well.

Affected applications and recommendations:

- **KDE Discover**: it uses OpenGL rendering by default. Use `apt` from the terminal to install packages instead.
- **Chromium / Chrome**: hardware acceleration, WebGL, and hardware video decoding are all unavailable. If GPU-accelerated browsing is required, watch for updates in future BSP releases.
- **Other OpenGL-accelerated desktop effects / compositors**: may fall back to software rendering or fail to start.

### USB-C DisplayPort Alt Mode limitations

The USB-C port supports DisplayPort 1.4 Alt Mode output. Common 1080p and 4K monitors do work, but the following limitations are confirmed on the current BSP from both user testing and the development team:

- **Hot-plug detection is unavailable on the DP-Alt path**: the monitor must be connected before power-on. Connecting, disconnecting, or switching monitors after boot will not be detected by HPD, and the display may remain blank.
- **Display stability can vary between boots**: the same hardware and image may boot once with a working display and again with no output.
- **High-bandwidth links can fail to train**: when the sink negotiates HBR2 (5.4 Gbps), the current driver has no clock-recovery fallback, which can leave the link in a black-screen state.

Recommendations:

- For long-running display scenarios, **connect the monitor before boot** and avoid hot-plug whenever possible.
- When display stability matters, use the latest Radxa OS image from the [download page](./download). The Debian 11 / Linux 5.15 image is currently the most stable LTS option, and related fixes are validated on that branch first.
- When you hit DP-Alt issues on a new image or a third-party BSP (Armbian, Fedora, etc.), first verify the monitor connection order and the negotiated resolution, then report the issue with the exact image version and boot logs.

### Console / fbdev fallback

Newer images do not provide a U-Boot display hand-off by default. If `/dev/fb0` is missing and the console falls back to the `dummy` device during systemd startup, you can use `kmscon` to drive a console directly through KMS:

<NewCodeBlock tip="Linux@host$" type="device">

```bash
sudo apt install kmscon
sudo systemctl enable --now kmscon
```

</NewCodeBlock>

## Image version and selection

The current official images for Cubie A7S are (see the [download page](./download) for the exact versions):

- **Radxa OS (Debian 11 / Linux 5.15)**: recommended for production and long-running use; GPU, DP, and console fixes are most complete here.
- **Radxa OS Lite (Debian 11 / Linux 5.15)**: no desktop environment, suited for embedded use.
- **Debian 13 test images (such as `trixie_cli_beta_v2`)**: used to validate new features and kernels; related patches are still being merged, and GPU / DP issues may still occur.
- **Buildroot / Tina Linux**: intended for deep embedded customization, behavior may differ from the Debian images.

If GPU acceleration, DP-Alt output, or console behavior is critical, confirm the kernel version and release date of the image you plan to use before deployment.
