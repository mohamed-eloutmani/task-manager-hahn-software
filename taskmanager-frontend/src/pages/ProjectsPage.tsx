import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import type { ProjectDto } from "../types/dto";

import ProjectCard from "../components/ProjectCard";
import CreateProjectDialog from "../components/CreateProjectDialog";

import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    setProjects(await getProjects());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">My Projects</Typography>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          + New Project
        </Button>
      </Stack>

      {projects.length === 0 && (
        <Typography color="text.secondary">
          You don’t have any projects yet. Create one to get started 🚀
        </Typography>
      )}

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </Box>

      <CreateProjectDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreated={load}
      />
    </Container>
  );
}
