---
sidebar_position: 1

doc_kind: wrapper
source_of_truth: common
imports_resolve_to:
  - i18n/en/docusaurus-plugin-content-docs/current/common/accessories/_camera-13m-214.mdx
---

import Camera13M214 from '../../../common/accessories/\_camera-13m-214.mdx';

# Radxa Camera 13M 214

:::tip Usage notes

This tutorial applies to the Radxa OS system image.

:::

<Camera13M214 product='Radxa Cubie A7S' interface='31-pin 0.3 mm pitch SMD horizontal FPC connector' connect='Flip type, bottom contact' pins='31-Pin' pitch='0.3mm pitch' orientation='opposite side' board='cubie-a7s'/>

## Preview the camera

Use GStreamer to preview the camera stream.

:::tip Camera device node

- Use `ls /dev/video*` to find the camera device node, and update the `device=` argument accordingly.

:::

### Preview

Run the following command on the board to preview the camera stream.

<NewCodeBlock tip="radxa@cubie-a7s$" type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video1 en-awisp=1 en-largemode=1 ! video/x-raw,format=NV12,width=4208,height=3120,framerate=24/1 ! xvimagesink
```

</NewCodeBlock>

## R6 Firmware Camera Commands

The following examples apply to Cubie A7S with R6 firmware images.

### 1920x1080 (1080p)

For IMX214 / IMX219 / IMX415 cameras.

<NewCodeBlock tip="radxa@cubie-a7s$" type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video0 en-awisp=1 en-largemode=0 ! video/x-raw,format=NV12,width=1920,height=1080,framerate=30/1 ! xvimagesink
```

</NewCodeBlock>

### 3840x2160 (4K)

For IMX214 / IMX415 cameras.

<NewCodeBlock tip="radxa@cubie-a7s$" type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video1 en-awisp=1 en-largemode=1 ! video/x-raw,format=NV12,width=3840,height=2160,framerate=30/1 ! xvimagesink
```

</NewCodeBlock>

### 4208x3120 (4K+)

For IMX214 cameras.

<NewCodeBlock tip="radxa@cubie-a7s$" type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video1 en-awisp=1 en-largemode=1 ! video/x-raw,format=NV12,width=4208,height=3120,framerate=30/1 ! xvimagesink
```

</NewCodeBlock>
