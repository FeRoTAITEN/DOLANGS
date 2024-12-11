import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function SettingsModal({TriggerComponent}) {
  const [open, setOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch available devices
  useEffect(() => {
    async function initDevices() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
        setAudioDevices(devices.filter((device) => device.kind === "audioinput"));
      } catch (error) {
        console.error("Error initializing devices:", error);
      }
    }

    initDevices();
  }, []);

  // Update the video element whenever cameraStream changes
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      console.log("Video ref is ready, setting stream...");
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      if (cameraStream) {
        stopCamera();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
        audio: selectedMicrophone ? { deviceId: { exact: selectedMicrophone } } : true,
      });

      setCameraStream(stream);
    } catch (error) {
      console.error("Error starting camera:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const toggleCamera = async () => {
    if (cameraStream) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  return (
    <Dialog data-theme="dark" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {TriggerComponent}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>WebRTC Camera Modal</DialogTitle>
          <DialogDescription>
            Preview your camera and choose audio/video devices.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {/* Camera and Microphone Selectors */}
          <div className="mb-4">
            <label className="block mb-2">Select Camera</label>
            <Select value={selectedCamera} onValueChange={setSelectedCamera}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a camera" />
              </SelectTrigger>
              <SelectContent>
                {videoDevices.map((device) => (
                  <SelectItem
                    key={device.deviceId || "unknown-camera"}
                    value={device.deviceId || "unknown-camera"}
                  >
                    {device.label || "Unnamed Camera"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select Microphone</label>
            <Select
              value={selectedMicrophone}
              onValueChange={setSelectedMicrophone}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a microphone" />
              </SelectTrigger>
              <SelectContent>
                {audioDevices.map((device) => (
                  <SelectItem
                    key={device.deviceId || "unknown-microphone"}
                    value={device.deviceId || "unknown-microphone"}
                  >
                    {device.label || "Unnamed Microphone"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Camera Preview */}
          <Button
            onClick={toggleCamera}
            className="mb-4"
            variant={cameraStream ? "default" : "outline"}
          >
            {cameraStream ? "Stop Camera" : "Start Camera"}
          </Button>
          <div className="aspect-video border rounded-md bg-gray-100 overflow-hidden">
            {cameraStream ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
                Camera is off
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setOpen(false)} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
