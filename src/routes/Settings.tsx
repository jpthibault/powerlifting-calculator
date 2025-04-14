import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CloseIcon from "@mui/icons-material/Close";
import { useSettings } from "../SettingsContext";
import defaultSettings from "../defaultSettings";

const Settings: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (key: string, value: any) => {
    const updatedSettings = { ...settings, [key]: value };
    updateSettings(updatedSettings);
  };

  const handleBorderColorChange = (index: number, color: string) => {
    const updatedBorderColors = [...settings.borderColors];
    updatedBorderColors[index].color = color;
    handleChange("borderColors", updatedBorderColors);
  };

  const handleExerciseTypeChange = (id: number, newName: string) => {
    const updatedExerciseTypes = settings.exerciseTypes.map((type) =>
      type.id === id ? { ...type, name: newName } : type
    );
    handleChange("exerciseTypes", updatedExerciseTypes);
  };

  const addExerciseType = () => {
    const newId = settings.exerciseTypes.length + 1;
    const updatedExerciseTypes = [
      ...settings.exerciseTypes,
      { id: newId, name: "New Exercise" },
    ];
    handleChange("exerciseTypes", updatedExerciseTypes);
  };

  const handleDeleteExerciseType = (id: number) => {
    const updatedExerciseTypes = settings.exerciseTypes.filter(
      (type) => type.id !== id
    );
    handleChange("exerciseTypes", updatedExerciseTypes);
  };

  const handleBarbellWeightChange = (
    _: React.MouseEvent<HTMLElement>,
    newWeight: number
  ) => {
    if (newWeight !== null) {
      handleChange("barbellWeight", newWeight);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "90vh",
          maxHeight: "90vh",
          mt: "5vh",
          mb: "5vh",
          backgroundColor: "#fff",
          color: "#333",
          borderRadius: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, pt: 1 }}
        >
          Settings
        </Typography>

        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            pr: 2,
            flex: 1,
          }}
        >
          <Box mb={4} width="100%">
            <Typography variant="h6">Border Colors</Typography>
            {settings.borderColors.map((border, index) => (
              <Box key={border.plate} display="flex" alignItems="center" mb={2}>
                <Typography sx={{ width: "50px" }}>{border.plate}:</Typography>
                <TextField
                  value={border.color}
                  onChange={(e) =>
                    handleBorderColorChange(index, e.target.value)
                  }
                  fullWidth
                />
              </Box>
            ))}
          </Box>

          <Box mb={4} width="100%">
            <Typography variant="h6">Exercise Types</Typography>
            {settings.exerciseTypes.map((type) => (
              <Box key={type.id} display="flex" alignItems="center" mb={2}>
                <TextField
                  value={type.name}
                  onChange={(e) =>
                    handleExerciseTypeChange(type.id, e.target.value)
                  }
                  fullWidth
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteExerciseType(type.id)}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              </Box>
            ))}
            <Button variant="outlined" onClick={addExerciseType} sx={{ mt: 2 }}>
              Add Exercise Type
            </Button>
          </Box>

          <Box mb={4} width="100%">
            <Typography variant="h6">Barbell Weight</Typography>
            <ToggleButtonGroup
              value={settings.barbellWeight}
              exclusive
              onChange={handleBarbellWeightChange}
              aria-label="Barbell Weight"
            >
              <ToggleButton value={45} aria-label="45 lbs">
                <FitnessCenterIcon sx={{ mr: 1 }} /> 45 lbs
              </ToggleButton>
              <ToggleButton value={35} aria-label="35 lbs">
                <FitnessCenterIcon sx={{ mr: 1 }} /> 35 lbs
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mt: 3,
            pt: 2,
            borderTop: "1px solid #eee",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("Settings saved!");
              onClose();
            }}
            fullWidth
            sx={{ mb: 2 }}
          >
            Save Settings
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              updateSettings(defaultSettings);
              localStorage.removeItem("settings");
            }}
          >
            Reset to Default
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default Settings;
