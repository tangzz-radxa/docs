---
sidebar_position: 7

doc_kind: wrapper
source_of_truth: common
imports_resolve_to:
  - i18n/en/docusaurus-plugin-content-docs/current/common/radxa-os/system-config/_audio_usage.mdx
---

import AUDIO from '../../../common/radxa-os/system-config/\_audio_usage.mdx';

# Audio

:::warning Onboard audio interfaces
Cubie A7S has **no HDMI port** and **no 3.5mm headphone jack** on the board. Digital audio is only available through the **USB‑C 2 (USB 3.2) DisplayPort Alt Mode** output; analog headphone output is not supported.

The only available audio output paths are **Bluetooth audio** and **DP Alt Mode digital audio**. To connect an HDMI display for audio, use a USB‑C to HDMI cable that supports DP Alt Mode.

For full hardware details, see the [Hardware interfaces](../hardware-use/hardware-info.md) page.
:::

<AUDIO debian_version="debian11" board="cubie-a7s" />
