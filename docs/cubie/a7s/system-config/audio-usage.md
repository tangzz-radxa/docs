---
sidebar_position: 7

doc_kind: wrapper
source_of_truth: common
imports_resolve_to:
  - docs/common/radxa-os/system-config/_audio_usage.mdx
---

import AUDIO from '../../../common/radxa-os/system-config/\_audio_usage.mdx';

# 音频管理

:::warning 板载音频接口说明
Cubie A7S 板载 **无 HDMI 接口**，也 **无 3.5mm 耳机插孔**。本主板仅通过 **USB-C 2 (USB 3.2) 的 DisplayPort Alt 模式**输出数字音频，不支持模拟耳机输出。

可用的音频输出方式只有 **蓝牙音频** 与 **DP Alt 模式数字音频** 两种；连接 HDMI 显示器时请使用支持 DP Alt 模式的 USB-C 转 HDMI 线缆。

各接口的硬件细节参见 [硬件接口说明](../hardware-use/hardware-info.md)。
:::

<AUDIO debian_version="debian11" board="cubie-a7s" />
