import React from "react";
import { ThemeProvider, CssBaseline, Snackbar } from "@mui/material";
import Stack from '@mui/material/Stack';
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import SignInCard from "../components/SignInCard";

export default function Authentication(props) {
    return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
            marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
            minHeight: "100%",
          },
          (theme) => ({
            "&::before": {
              content: '""',              
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage:'url(/loginBg.svg)',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              ...theme.applyStyles?.("dark", {
                backgroundImage:
                  "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>

    </ThemeProvider>
  );
}

