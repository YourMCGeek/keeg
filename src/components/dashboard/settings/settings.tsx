"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

import BuiltByBitCard from "./cards/builtbybit";
import VideoDownloaderCard from "./cards/video-downloader";
import ResourceCheckingCard from "./cards/resource-checking";
import type { FormState, ResourceCheckingData, SectionInputKey } from "./types";

const SECTIONS = [
  {
    id: "builtbybit",
    title: "BuiltByBit",
  },
  {
    id: "video-downloader",
    title: "Video Downloader",
  },
  {
    id: "resource-checking",
    title: "Resource Checking",
    subsections: [
      { id: "minecraft", title: "Minecraft" },
      { id: "roblox", title: "Roblox" },
    ],
  },
];

export default function Settings() {
  const { state } = useSidebar();
  const [formState, setFormState] = useState<FormState>({
    builtbybit: {
      firstName: "",
      lastName: "",
      theme: "system",
      notifications: "all",
    },
    videoDownloader: { firstName: "", lastName: "", language: "" },
    resourceChecking: {
      minecraft: { firstName: "", lastName: "" },
      roblox: { firstName: "", lastName: "" },
    },
  });

  const [initialState, setInitialState] = useState<FormState>(formState);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("builtbybit");

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setUnsavedChanges(
      JSON.stringify(formState) !== JSON.stringify(initialState),
    );
  }, [formState, initialState]);

  useEffect(() => {
    const handleScroll = () => {
      const offsetTop = window.scrollY + 100;
      for (const section of SECTIONS) {
        const el = sectionRefs.current[section.id];
        if (
          el &&
          el.offsetTop <= offsetTop &&
          el.offsetTop + el.offsetHeight > offsetTop
        ) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
            history.replaceState(null, "", `#${section.id}`);
          }
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes.";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [unsavedChanges]);

  const handleSave = () => {
    setInitialState(formState);
    setUnsavedChanges(false);
  };

  // Update top-level or resourceChecking subsections input field
  const updateField = (
    section: keyof FormState,
    subSection: keyof ResourceCheckingData | null,
    key: SectionInputKey,
    value: string,
  ) => {
    if (section === "resourceChecking" && subSection) {
      setFormState((prev) => ({
        ...prev,
        resourceChecking: {
          ...prev.resourceChecking,
          [subSection]: {
            ...prev.resourceChecking[subSection],
            [key]: value,
          },
        },
      }));
    } else if (subSection === null) {
      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    }
  };

  const cardProps = {
    formState,
    updateField,
    sectionRefs,
  };

  // Responsive layout based on sidebar state
  const isExpanded = state === "expanded";

  return (
    <div
      className={`w-full transition-all duration-200 ${
        isExpanded ? "px-6 py-6 lg:px-8 lg:py-8" : "px-4 py-6 lg:px-12 lg:py-8"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-200 ${
          isExpanded ? "max-w-5xl" : "max-w-6xl"
        }`}
      >
        <div className="space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>

          {/* Setting Cards */}
          <div
            className={`grid gap-8 transition-all duration-200 ${
              isExpanded ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"
            }`}
          >
            <div className="space-y-8">
              <BuiltByBitCard {...cardProps} />
              <VideoDownloaderCard {...cardProps} />
            </div>
            <div className="space-y-8">
              <ResourceCheckingCard {...cardProps} />
            </div>
          </div>
        </div>
      </div>

      {unsavedChanges && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Button onClick={handleSave} className="shadow-lg">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
