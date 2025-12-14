import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  title: string;
  description?: string;
  onBack: () => void;
  onDelete: () => void;
};

export default function ProjectHeader({
  title,
  description,
  onBack,
  onDelete,
}: Props) {
  return (
    <Box mb={4}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Back button */}
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>

        {/* Title & description */}
        <Box flexGrow={1}>
          <Typography variant="h4" fontWeight={600}>
            {title}
          </Typography>

          {description && (
            <Typography color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        {/* Delete project */}
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Delete Project
        </Button>
      </Stack>
    </Box>
  );
}
