import React from "react";
import { cn } from "../../lib/utils";
import { AnimatedList } from "./xyz";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const notifications: Item[] = [
    {
      name: "Code review request",
      description: "A colleague has requested a review for the code changes you made in the latest branch. Please review the code and provide feedback or approval.",
      time: "10s ago",
      icon: "🔍",
      color: "#FF6F61",
    },
    {
      name: "Build failed",
      description: "The latest build process encountered errors and has failed. Check the build logs for detailed information and address the issues to proceed.",
      time: "5s ago",
      icon: "❌",
      color: "#FF3D71",
    },
    {
      name: "New PR opened",
      description: "A new pull request has been opened by a team member. Review the changes and merge them if everything is correct, or request further modifications.",
      time: "20s ago",
      icon: "🔄",
      color: "#00C9A7",
    },
    {
      name: "Meeting reminder",
      description: "This is a reminder for the upcoming team sync meeting scheduled in 10 minutes. Please prepare your updates and join the meeting on time.",
      time: "15s ago",
      icon: "📅",
      color: "#1E86FF",
    },
    {
      name: "Task assigned",
      description: "A new task has been assigned to you. Review the task details and start working on it according to the given requirements and deadlines.",
      time: "30s ago",
      icon: "📝",
      color: "#FFB800",
    },
    {
      name: "Merge conflict",
      description: "There is a merge conflict that needs to be resolved in your branch. Review the conflicting changes and resolve them to proceed with the merge.",
      time: "25s ago",
      icon: "⚠️",
      color: "#FF6F61",
    },
    {
      name: "Server restarted",
      description: "The server has been successfully restarted after applying recent changes. Monitor the server to ensure it is operating correctly and performing as expected.",
      time: "12s ago",
      icon: "🔄",
      color: "#00C9A7",
    },
    {
      name: "New issue created",
      description: "A new issue has been created in the repository. Review the issue details, assign it to the appropriate team member, and start addressing it as needed.",
      time: "8s ago",
      icon: "🛠️",
      color: "#FFB800",
    },
    {
      name: "Code merged",
      description: "The code changes you submitted have been successfully merged into the main branch. Verify that the integration did not introduce any issues or conflicts.",
      time: "18s ago",
      icon: "✅",
      color: "#1E86FF",
    },
    {
      name: "Deployment succeeded",
      description: "The latest deployment has been completed successfully. Confirm that all new features and updates are working as intended in the production environment.",
      time: "22s ago",
      icon: "🚀",
      color: "#00C9A7",
    },
  ];
  

// Extend the notifications array for looping effect
const extendedNotifications = Array.from({ length: 1000 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // Add animation styles here if necessary
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex min-w-10 h-10 mr-6 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg bg-background md:shadow-xl",
        className,
      )}
    >
      <AnimatedList>
        {extendedNotifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
