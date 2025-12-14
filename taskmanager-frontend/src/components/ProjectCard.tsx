import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Stack,
} from "@mui/material";

import type { Project } from "../api/projects";
import type { ProjectProgressDto } from "../types/dto";
import { getProjectProgress } from "../api/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<ProjectProgressDto | null>(null);

  useEffect(() => {
    getProjectProgress(project.id)
      .then(setProgress)
      .catch(() => {}); // silent fail (card should still render)
  }, [project.id]);

  return (
    <Card
      onClick={() => navigate(`/projects/${project.id}`)}
      sx={{
        cursor: "pointer",
        height: "100%",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          {/* Title */}
          <Typography variant="h6" noWrap>
            {project.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {project.description || "No description"}
          </Typography>

          {/* Progress */}
          {progress && (
            <Box mt={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={0.5}
              >
                <Typography variant="caption">
                  {progress.completedTasks} / {progress.totalTasks} tasks
                </Typography>
                <Typography variant="caption">
                  {Math.round(progress.progressPercentage)}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress.progressPercentage}
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
