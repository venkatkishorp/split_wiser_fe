import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#009688",		// normal text color, green shade
		},
		secondary: {
			main: "#f0f8ff"			// for headers with blue background, white shade
		},
	},
	typography: {
		allVariants: {
			color: "#009688"
		}
	}
});

export default theme;