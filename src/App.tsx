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
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Weight = ({ plate }) => {
  const borderColor = plate === 45 ? "blue" : plate === 25 ? "green" : "#ccc";
  return (
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
  );
};

const calculateWeightBreakdown = (weight) => {
  const plates = [45, 35, 25, 10, 5, 2.5];
  const breakdown = [];

  plates.forEach((plate) => {
    const count = Math.floor(weight / plate);
    for (let i = 0; i < count; i++) {
      breakdown.push(plate);
    }
    weight -= count * plate;
  });

  return breakdown;
};

const App = () => {
  const [weights, setWeights] = useState({
    Deadlift: 0,
    BenchPress: 0,
    BackSquat: 0,
  });
  const [activeTab, setActiveTab] = useState("Deadlift");

  useEffect(() => {
    const storedWeights = localStorage.getItem("weights");
    if (storedWeights) {
      setWeights(JSON.parse(storedWeights));
    }
  }, []);

  const handleWeightInput = (value) => {
    const weight = Number(value);
    const updatedWeights = { ...weights, [activeTab]: weight };
    setWeights(updatedWeights);
    localStorage.setItem("weights", JSON.stringify(updatedWeights));
  };

  const tabs = ["Deadlift", "Bench Press", "Back Squat"];
  const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40];

  const roundToNearestHalf = (num) => {
    return Math.round(num * 2) / 2;
  };

  const roundToNearestLoadableWeight = (weight) => {
    const remainder = weight % 5;
    if (remainder === 0) return weight;
    return remainder < 2.5 ? weight - remainder : weight + (5 - remainder);
  };

  const calculateWeight = (percentage) => {
    const maxWeight = weights[activeTab];
    const totalWeight = roundToNearestHalf((maxWeight * percentage) / 100);
    const roundedWeight = roundToNearestLoadableWeight(totalWeight);
    const perSide = roundToNearestHalf((roundedWeight - 45) / 2);
    return { totalWeight: roundedWeight, perSide };
  };

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
        color: "#333", // Set a dark text color
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
                    {totalWeight} lbs
                  </Typography>
                  {totalWeight > 0 && (
                    <>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={3}
                      >
                        {[...breakdown].reverse().map((plate, index) => (
                          <Weight key={index} plate={plate} />
                        ))}
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
                              top: "-20px",
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
                        {breakdown.map((plate, index) => (
                          <Weight
                            key={index + breakdown.length}
                            plate={plate}
                          />
                        ))}
                      </Box>
                    </>
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
