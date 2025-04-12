import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
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

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
          color: "#333",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>

        <Box mb={4} width="100%">
          <Typography variant="h6">Border Colors</Typography>
          {settings.borderColors.map((border, index) => (
            <Box key={border.plate} display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "50px" }}>{border.plate}:</Typography>
              <TextField
                value={border.color}
                onChange={(e) => handleBorderColorChange(index, e.target.value)}
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

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            alert("Settings saved!");
            onClose();
          }}
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
          sx={{ mt: 2 }}
        >
          Reset to Default
        </Button>
      </Container>
    </Modal>
  );
};

export default Settings;
