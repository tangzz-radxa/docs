---
sidebar_position: 1

doc_kind: wrapper
source_of_truth: common
imports_resolve_to:
  - docs/common/accessories/_camera-4k.mdx
---

import Camera4K from '../../../common/accessories/\_camera-4k.mdx';

# 瑞莎 4K 摄像头

<Camera4K product='瑞莎 Cubie A7A' interface='31-Pin 0.3 mm 间距 SMD 卧式 FPC 接口' connect='翻盖式，下接触' pins='31-Pin' pitch='0.3mm 间距' orientation='异面' board='cubie-a7a' enable_camera='Enable Radxa Camera 4K'/>

## 预览摄像头

使用 GStreamer 预览摄像头画面。

<NewCodeBlock tip='radxa@cubie-a7a$' type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video1 en-awisp=1 en-largemode=1 ! video/x-raw,format=NV12,width=3840,height=2160,framerate=24/1  ! xvimagesink
```

</NewCodeBlock>

## R6 固件摄像头命令

以下示例针对 Cubie A7A 的 R6 镜像版本。

### 3840x2160 (4K)

适用于 IMX214 / IMX415 摄像头。

<NewCodeBlock tip='radxa@cubie-a7a$' type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video1 en-awisp=1 en-largemode=1 ! video/x-raw,format=NV12,width=3840,height=2160,framerate=30/1 ! xvimagesink
```

</NewCodeBlock>

### 4208x3120 (4K+)

适用于 IMX214 摄像头。

<NewCodeBlock tip='radxa@cubie-a7a$' type="device">

```bash
DISPLAY=:0 gst-launch-1.0 v4l2src device=/dev/video1 en-awisp=1 en-largemode=1 ! video/x-raw,format=NV12,width=4208,height=3120,framerate=30/1 ! xvimagesink
```

</NewCodeBlock>
