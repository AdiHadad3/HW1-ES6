import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/joy";
import EmailIcon from "@mui/icons-material/Email"; // Correct icon name
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import { CardMedia } from "@mui/material";

export default function Profile({ logedUser, logoutUser, wantToEditDetails }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const [year1, month1, day1] = logedUser.dateOfBirth.split("-");
    setYear(year1);
    setMonth(month1);
    setDay(day1);
  }, [logedUser]);

  const MonthSwitch = (m) => {
    switch (m) {
      case "01":
        return "ינואר";
      case "02":
        return "פברואר";
      case "03":
        return "מרץ";
      case "04":
        return "אפריל";
      case "05":
        return "מאי";
      case "06":
        return "יוני";
      case "07":
        return "יולי";
      case "08":
        return "אוגוסט";
      case "09":
        return "ספטמבר";
      case "10":
        return "אוקטובר";
      case "11":
        return "נובמבר";
      case "12":
        return "דצמבר";
      default:
        return "";
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
          }}
        >
          <CardMedia
            component="img"
            height="100"
            image={logedUser.img}
            sx={{
              width: "25%",
              maxWidth: "150px",
              borderRadius: 50,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              objectFit: "cover",
            }}
          ></CardMedia>

          <CardContent sx={{ textAlign: "right", direction: "rtl" }}>
            <Box>
              <Typography fontSize="md" fontWeight="xl">
                {logedUser.firstName} {logedUser.lastName}
              </Typography>
              <Typography
                component="div"
                display="flex"
                fontWeight="lg"
                fontSize="sm"
              >
                <EmailIcon sx={{ width: "12px" }} />
                {logedUser.email}
              </Typography>
              <Typography
                component="div"
                display="flex"
                fontWeight="lg"
                fontSize="sm"
              >
                <LocationOnIcon sx={{ width: "12px" }} />
                {logedUser.street} {logedUser.homeNumber}, {logedUser.city}
              </Typography>
              <Typography
                component="div"
                display="flex"
                fontWeight="lg"
                fontSize="sm"
              >
                <CakeIcon sx={{ width: "12px" }} />
                {day}, ב{MonthSwitch(month)} {year}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              <Button
                variant="solid"
                size="sm"
                color="neutral"
                sx={{ alignSelf: "center", fontWeight: 500 }}
                onClick={() => wantToEditDetails()}
              >
                עדכון פרטים
              </Button>

              <Button
                variant="solid"
                size="sm"
                color="primary"
                sx={{ alignSelf: "center", fontWeight: 500 }}
                onClick={() => {
                  window.open(
                    "https://www.xn--4dbbbkce4a6ahe6ioa.co.il/",
                    "_blank"
                  );
                }}
              >
                למשחק
              </Button>

              <Button
                variant="solid"
                size="sm"
                color="danger"
                sx={{ alignSelf: "center", fontWeight: 500 }}
                onClick={() => logoutUser(true)}
              >
                התנתק
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
