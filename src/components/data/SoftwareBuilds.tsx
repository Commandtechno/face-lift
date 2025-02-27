import type { ReactElement } from "react";

import Skeleton from "@/components/data/Skeleton";
import SoftwareBuildChanges from "@/components/data/SoftwareBuildChanges";
import type { Build } from "@/lib/service/types";
import { getVersionBuildDownloadURL } from "@/lib/service/v2";
import { formatRelativeDate, formatISODateTime } from "@/lib/util/time";

export interface SoftwareBuildsProps {
  project: string;
  version: string;
  builds?: Build[];
}

const SoftwareBuilds = ({
  project,
  version,
  builds,
}: SoftwareBuildsProps): ReactElement => (
  <div className="flex flex-col gap-1">
    {builds &&
      builds
        .slice()
        .reverse()
        .slice(0, 10)
        .map((build) => (
          <div
            className="flex flex-row items-start hover:bg-blue-100 dark:hover:bg-gray-900 px-4 py-2 rounded-lg transition-colors"
            key={build.build}
          >
            <a
              role="button"
              href={getVersionBuildDownloadURL(
                project,
                version,
                build.build,
                build.downloads["application"].name
              )}
              rel="noreferrer"
              target="_blank"
              className="bg-gray-800 text-gray-100 text-sm text-center font-medium rounded-full p-2 min-w-16 mr-4"
            >
              #{build.build}
            </a>
            <div className="flex-1 flex flex-col mt-1 text-gray-900 dark:text-gray-200">
              <SoftwareBuildChanges project={project} build={build} />
            </div>
            <div
              className="hidden md:block text-gray-500 dark:text-gray-300 mt-1 ml-2"
              title={formatISODateTime(new Date(build.time))}
            >
              {formatRelativeDate(new Date(build.time))}
            </div>
          </div>
        ))}
    {!builds &&
      [...Array(5)].map((_, k) => (
        <div className="flex flex-row items-start w-full" key={k}>
          <div className="bg-gray-800 rounded-full p-2 min-w-16 mr-4 ">
            <Skeleton className="h-5" />
          </div>
          <Skeleton className="mt-1 flex-grow" />
        </div>
      ))}
  </div>
);

export default SoftwareBuilds;
