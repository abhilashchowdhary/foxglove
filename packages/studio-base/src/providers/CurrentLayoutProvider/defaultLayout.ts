// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { LayoutData } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";

/**
 * This is loaded when the user has no layout selected on application launch
 * to avoid presenting the user with a blank layout.
 */
export const defaultLayout: LayoutData = {
  "configById": {
    "Plot!1x7vamx": {
      "title": "Plot",
      "paths": [
        {
          "value": "/boss/state.smart_speed_enabled",
          "enabled": true,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/boss/state.speed_limit_forward",
          "enabled": true,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/drive_assist/pilot_smart_speed_heading.smart_speed",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "showXAxisLabels": true,
      "showYAxisLabels": true,
      "showLegend": true,
      "legendDisplay": "floating",
      "showPlotValuesInLegend": false,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "sidebarDimension": 240,
      "followingViewWidth": 20
    },
    "RawMessages!hin0y7": {
      "autoExpandMode": "auto",
      "diffEnabled": false,
      "diffMethod": "custom",
      "diffTopicPath": "",
      "showFullMessageForDiff": false,
      "topicPath": "/move_serve/proximity/state",
      "expansion": {
        "timestamp": "c"
      }
    },
    "RawMessages!3mxymk": {
      "autoExpandMode": "auto",
      "diffEnabled": false,
      "diffMethod": "custom",
      "diffTopicPath": "",
      "showFullMessageForDiff": false,
      "topicPath": "/boss/state.health_alerts[:]"
    },
    "RawMessages!30o4672": {
      "autoExpandMode": "auto",
      "diffEnabled": false,
      "diffMethod": "custom",
      "diffTopicPath": "",
      "showFullMessageForDiff": false,
      "topicPath": "/motion_switch/active"
    },
    "ImageViewPanel!2tciisj": {
      "cameraTopic": "/fox/ap_insight_view/image",
      "enabledMarkerTopics": [],
      "mode": "fit",
      "pan": {
        "x": 0,
        "y": 0
      },
      "rotation": 0,
      "synchronize": false,
      "transformMarkers": false,
      "zoom": 1
    },
    "RawMessages!n2la0c": {
      "autoExpandMode": "auto",
      "diffEnabled": false,
      "diffMethod": "custom",
      "diffTopicPath": "",
      "showFullMessageForDiff": false,
      "topicPath": "/boss/state"
    },
    "3D!34lzq8z": {
      "cameraState": {
        "perspective": true,
        "distance": 12.604988194490627,
        "phi": 8.709734749477096,
        "thetaOffset": 84.48387102091665,
        "targetOffset": [
          3.223757482501154,
          1.9737645557299834,
          2.321939227900761e-16
        ],
        "target": [
          0,
          0,
          0
        ],
        "targetOrientation": [
          0,
          0,
          0,
          1
        ],
        "fovy": 45,
        "near": 0.5,
        "far": 5000
      },
      "followMode": "follow-pose",
      "followTf": "base_link",
      "scene": {},
      "transforms": {},
      "topics": {
        "/fox/proximity/layers": {
          "visible": true
        },
        "/fox/cognition/sta_boundary": {
          "visible": true
        },
        "/fox/move_serve/st_map_vis": {
          "visible": true
        },
        "/fox/move_serve/planned_path_vis": {
          "visible": false
        }
      },
      "layers": {},
      "publish": {
        "type": "point",
        "poseTopic": "/move_base_simple/goal",
        "pointTopic": "/clicked_point",
        "poseEstimateTopic": "/initialpose",
        "poseEstimateXDeviation": 0.5,
        "poseEstimateYDeviation": 0.5,
        "poseEstimateThetaDeviation": 0.26179939
      }
    }
  },
  "globalVariables": {},
  "userNodes": {},
  "playbackConfig": {
    "speed": 1,
  },
  "layout": {
    "direction": "row",
    "first": {
      "first": "3D!34lzq8z",
      "second": "Plot!1x7vamx",
      "direction": "column"
    },
    "second": {
      "direction": "row",
      "first": {
        "first": {
          "first": "RawMessages!hin0y7",
          "second": "RawMessages!3mxymk",
          "direction": "column"
        },
        "second": "RawMessages!30o4672",
        "direction": "column",
        "splitPercentage": 63.66251198465963
      },
      "second": {
        "first": "ImageViewPanel!2tciisj",
        "second": "RawMessages!n2la0c",
        "direction": "column",
        "splitPercentage": 29.869130100076983
      },
      "splitPercentage": 45.54655870445343
    },
    "splitPercentage": 48.824232762056596
  }
} as const;
