import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Slide,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TransitionGroup } from "react-transition-group";

interface WeightProps {
  plate: number;
  direction: "left" | "right";
  delay?: number; // New optional delay attribute
}

// Ensure the `in` prop is dynamically updated for all items
const Weight: React.FC<WeightProps> = ({ plate, direction, delay = 0 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const borderColor = plate === 45 ? "blue" : plate === 25 ? "green" : "#ccc";

  return (
    <Slide
      direction={direction}
      in={show} // Dynamically update the `in` prop
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          width: "40px",
          height: "40px",
          backgroundColor: "#f0f0f0",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          margin: "0 4px",
          border: `2px solid ${borderColor}`,
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

const App: React.FC = () => {
  const [weights, setWeights] = useState<{
    Deadlift: number;
    BenchPress: number;
    BackSquat: number;
  }>({
    Deadlift: 0,
    BenchPress: 0,
    BackSquat: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "Deadlift" | "BenchPress" | "BackSquat"
  >("Deadlift");

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

  const handleWeightInput = (value: string) => {
    const weight = Number(value);
    const updatedWeights = { ...weights, [activeTab]: weight };
    setWeights(updatedWeights);
    localStorage.setItem("weights", JSON.stringify(updatedWeights));
  };

  const tabs: ("Deadlift" | "BenchPress" | "BackSquat")[] = [
    "Deadlift",
    "BenchPress",
    "BackSquat",
  ];
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
    const perSide = roundToNearestHalf((roundedWeight - 45) / 2);
    return { totalWeight: roundedWeight, perSide };
  };

  // Define a constant for the transition delay
  const TRANSITION_DELAY = 500; // Delay in milliseconds

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Powerlifting Percentage Calculator
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={4}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "contained" : "outlined"}
            color="primary"
            onClick={() => setActiveTab(tab)}
            sx={{ mx: 1 }}
          >
            {tab}
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

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {percentages.map((percentage) => {
          const { totalWeight, perSide } = calculateWeight(percentage);
          if (totalWeight < 45) return null;

          const breakdown = calculateWeightBreakdown(perSide);

          return (
            <Grid size={{ xs: 12 }} key={percentage}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    display="flex"
                    alignItems="center"
                  >
                    {percentage}%
                    <ArrowForwardIcon sx={{ mx: 1, color: "#333" }} />
                    {Math.round(weights[activeTab] * (percentage / 100))} lbs
                  </Typography>
                  {totalWeight > 0 && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                      mt={3}
                    >
                      <TransitionGroup>
                        <Stack
                          direction="row-reverse" // Use row-reverse to render biggest numbers first
                          alignItems="center"
                          justifyContent="center"
                          spacing={1} // Add spacing between items
                        >
                          {breakdown.map((plate, index) => (
                            <Weight
                              key={`${plate}-${index}`}
                              plate={plate}
                              direction="right"
                              delay={index * TRANSITION_DELAY}
                            />
                          ))}
                        </Stack>
                      </TransitionGroup>
                      <Box
                        sx={{
                          flexGrow: 1,
                          height: "4px",
                          backgroundColor: "#ccc",
                          margin: "0 8px",
                          maxWidth: "200px",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            position: "absolute",
                            top: "-8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#f5f5f5",
                            padding: "0 4px",
                            borderRadius: "4px",
                          }}
                        >
                          {breakdown.reduce(
                            (sum, plate) => sum + plate * 2,
                            45
                          )}
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {breakdown.map((plate, index) => (
                          <Weight
                            key={`${plate}-${index + breakdown.length}`}
                            plate={plate}
                            direction="left"
                            delay={index * TRANSITION_DELAY} // Use constant for delay
                          />
                        ))}
                      </Stack>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default App;
