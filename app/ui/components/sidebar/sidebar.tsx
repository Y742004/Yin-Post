"use client";

import { Button, Divider } from "@nextui-org/react";
import { CardIcon } from "../../icons/card-icon";
import { CoachIcon } from "../../icons/coach-icon";
import { CourseVideoIcon } from "../../icons/course-video-icon";
import { LayersIcon } from "../../icons/layer-icon";
import { LearnerIcon } from "../../icons/learner-icon";
import { SettingIcon } from "../../icons/setting-icon";
import clsx from "clsx";
import { useState } from "react";
import { DoubleArrowIcon } from "../../icons/double-arrow-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const pathname = usePathname();

  const sidebarData = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayersIcon className="w-6 h-6" />,
      href: "/dashboard/admin",
    },
    {
      id: 2,
      name: "Coaches",
      icon: <CoachIcon className="w-6 h-6" />,
      href: "/coaches",
    },
    {
      id: 3,
      name: "Learners",
      icon: <LearnerIcon className="w-6 h-6" />,
      href: "/learners",
    },
    {
      id: 4,
      name: "Videos",
      icon: <CourseVideoIcon className="w-6 h-6" />,
      href: "/videos",
    },
  ];

  return (
    <div
      className={clsx("pt-5 bg-[#161B1F] h-screen relative", {
        "w-96": isOpen,
      })}
    >
      <h1 className="font-bold text-2xl text-primary px-5">
        {isOpen ? "LMS.WTF" : "L"}
      </h1>

      <div className=" mt-10">
        {sidebarData.map((item) => (
          <SidebarItem
            key={item.id}
            isActive={pathname === item.href}
            name={item.name}
            icon={item.icon}
            href={item.href}
            isOpen={isOpen}
          />
        ))}

        <div className="absolute bottom-3 left-2">
          <Button
            isIconOnly
            color="primary"
            variant="bordered"
            onClick={() => setIsOpen(!isOpen)}
          >
            <DoubleArrowIcon
              className={clsx("w-6 h-6", { "rotate-180": isOpen })}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  name,
  icon,
  isActive,
  isOpen,
  href = "/",
}: {
  name: string;
  icon?: any;
  isActive?: boolean;
  isOpen?: boolean;
  href?: string;
}) {
  return (
    <Link className="w-full inline-block" href={href}>
      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-3 border-transparent border-l-4",
          {
            "!border-primary": isActive,
          }
        )}
      >
        {icon}

        {isOpen && <span>{name}</span>}
      </div>
    </Link>
  );
}
