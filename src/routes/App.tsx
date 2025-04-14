import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Slide,
  Stack,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TransitionGroup } from "react-transition-group";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSettings } from "../SettingsContext";
import Settings from "./Settings";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

interface WeightProps {
  plate: number;
  direction: "left" | "right";
  delay?: number; // New optional delay attribute
}

// Ensure the `in` prop is dynamically updated for all items
const Plate: React.FC<WeightProps> = ({ plate, direction, delay = 0 }) => {
  const { settings } = useSettings();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const borderColor =
    settings.borderColors.find((b) => b.plate === plate)?.color || "#ccc";

  return (
    <Slide
      direction={direction}
      in={show} // Dynamically update the `in` prop
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          minWidth: 40,
          height: "60px", // Increased height to make the plates more realistic
          backgroundColor: "#f0f0f0",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          fontSize: 12,
          transform: "skewY(-10deg)", // Apply skew to replicate the plate design
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        }}
      >
        {plate}
      </Box>
    </Slide>
  );
};

const calculateWeightBreakdown = (weight: number): number[] => {
  const plates = [45, 35, 25, 10, 5, 2.5];
  const breakdown: number[] = [];

  plates.forEach((plate) => {
    const count = Math.floor(weight / plate);
    for (let i = 0; i < count; i++) {
      breakdown.push(plate);
    }
    weight -= count * plate;
  });

  return breakdown;
};

const groupPlates = (plates: number[]): { plate: number; count: number }[] => {
  const plateCounts: { [key: number]: number } = {};

  plates.forEach((plate) => {
    plateCounts[plate] = (plateCounts[plate] || 0) + 1;
  });

  return Object.entries(plateCounts)
    .map(([plate, count]) => ({ plate: Number(plate), count }))
    .sort((a, b) => b.plate - a.plate);
};

const App: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [weights, setWeights] = useState<{
    [key: string]: number;
  }>({
    Deadlift: 0,
    BenchPress: 0,
    BackSquat: 0,
  });

  const [activeTab, setActiveTab] = useState(
    settings.exerciseTypes[0]?.name || ""
  );

  const [delayedWeights, setDelayedWeights] = useState(weights);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDelayedWeights(weights);
    }, 300);

    return () => clearTimeout(delay);
  }, [weights]);

  useEffect(() => {
    const storedWeights = localStorage.getItem("weights");
    if (storedWeights) {
      setWeights(JSON.parse(storedWeights));
    }
  }, []);

  useEffect(() => {
    setActiveTab(settings.exerciseTypes[0]?.name || "");
  }, [settings]);

  const handleWeightInput = (value: string) => {
    const weight = Number(value);
    const updatedWeights = { ...weights, [activeTab]: weight };
    setWeights(updatedWeights);
    localStorage.setItem("weights", JSON.stringify(updatedWeights));
  };

  const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40];

  const roundToNearestHalf = (num: number): number => {
    return Math.round(num * 2) / 2;
  };

  const roundToNearestLoadableWeight = (weight: number): number => {
    const remainder = weight % 5;
    if (remainder === 0) return weight;
    return remainder < 2.5 ? weight - remainder : weight + (5 - remainder);
  };

  const calculateWeight = (percentage: number) => {
    const maxWeight = delayedWeights[activeTab];
    const totalWeight = roundToNearestHalf((maxWeight * percentage) / 100);
    const roundedWeight = roundToNearestLoadableWeight(totalWeight);
    const perSide = roundToNearestHalf((roundedWeight - barbellWeight) / 2);
    return { totalWeight: roundedWeight, perSide };
  };

  // Define a constant for the transition delay
  const TRANSITION_DELAY = 500; // Delay in milliseconds

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [barbellWeight, setBarbellWeight] = useState(settings.barbellWeight);

  const handleBarbellWeightChange = (
    event: React.MouseEvent<HTMLElement>,
    newWeight: number
  ) => {
    if (newWeight !== null) {
      setBarbellWeight(newWeight);
      updateSettings({ ...settings, barbellWeight: newWeight });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: 900,
        backgroundColor: "#f5f5f5",
        color: "#333",
        position: "relative",
      }}
    >
      <Button
        onClick={() => setIsSettingsOpen(true)}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          minWidth: "auto",
          padding: 0,
        }}
      >
        <SettingsIcon fontSize="large" />
      </Button>
      <ToggleButtonGroup
        value={barbellWeight}
        exclusive
        onChange={handleBarbellWeightChange}
        aria-label="Barbell Weight"
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        <ToggleButton value={45} aria-label="45 lbs">
          <FitnessCenterIcon /> 45 lbs
        </ToggleButton>
        <ToggleButton value={35} aria-label="35 lbs">
          <FitnessCenterIcon /> 35 lbs
        </ToggleButton>
      </ToggleButtonGroup>
      <Settings
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <Box textAlign="center" mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Powerlifting Percentage Calculator
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={4}>
        {settings.exerciseTypes.map((type) => (
          <Button
            key={type.id}
            variant={activeTab === type.name ? "contained" : "outlined"}
            color="primary"
            onClick={() => setActiveTab(type.name)}
            sx={{ mx: 1 }}
          >
            {type.name}
          </Button>
        ))}
      </Box>

      <Box mb={4}>
        <TextField
          fullWidth
          type="number"
          label={`Enter your max weight for ${activeTab} (lbs)`}
          variant="outlined"
          value={weights[activeTab] || ""}
          onFocus={(e) => e.target.select()}
          onChange={(e) => handleWeightInput(e.target.value)}
        />
      </Box>

      <Box mb={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {[100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40]
                .sort((a, b) => b - a)
                .map((percentage) => {
                  const { totalWeight, perSide } = calculateWeight(percentage);
                  if (totalWeight < 45) return null;

                  const breakdown = calculateWeightBreakdown(perSide);

                  return (
                    <TableRow key={percentage}>
                      <TableCell>
                        <Typography variant="h5">{percentage}%</Typography>
                        <Divider />
                        <Typography variant="caption">
                          {Math.round(weights[activeTab] * (percentage / 100))}{" "}
                          lbs
                        </Typography>
                        <Divider />
                        <Typography variant="caption">
                          Bar load: {totalWeight} lbs
                        </Typography>
                        <Divider />
                      </TableCell>

                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-start"
                          spacing={1}
                        >
                          {groupPlates(breakdown).map(
                            ({ plate, count }, index) => (
                              <Box
                                sx={{
                                  position: "relative",
                                  pr: `${count * 5}px`,
                                }}
                                key={plate}
                              >
                                {[...Array(count)].map((_, i) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      minWidth: 40,
                                      height: "60px",
                                      backgroundColor: "#f0f0f0",
                                      color: "#333",
                                      borderRadius: "4px",
                                      border: `2px solid ${settings.borderColors.find((b) => b.plate === plate)?.color || "#ccc"}`,
                                      fontSize: 12,
                                      left: `${i * 5}px`,
                                      marginTop: i ? `-60px` : 0, // Stack plates on top of each other
                                      position: "relative",
                                      zIndex: 100, // Stack plates visually
                                      transform: "skewY(-10deg)", // Apply skew to replicate the plate design
                                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for depth
                                    }}
                                  >
                                    <Typography>{plate}</Typography>
                                    <Typography variant="caption">
                                      x{count}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default App;
