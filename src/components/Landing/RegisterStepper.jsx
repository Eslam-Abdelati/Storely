import { useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

const steps = [
  "تفاصيل الشركة",
  "بيانات المستخدم",
  "التحكم في الوصول",
  "المراجعة والإرسال",
];

/* =======================
   Custom Connector (الخط)
======================= */
const CustomConnector = styled(StepConnector)(() => ({
  top: 16,
  left: "calc(50% + 16px)",
  right: "calc(-50% + 16px)",

  "& .MuiStepConnector-line": {
    height: 2,
    border: 0,
    backgroundColor: "#e2e8f0", // slate-200
  },
}));

/* =======================
   Custom Step Icon
======================= */
const StepIconRoot = styled("div")(({ ownerState }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontWeight: 700,
  zIndex: 1,
  transition: "all 0.2s ease",

  /* ✅ Completed */
  ...(ownerState.completed && {
    backgroundColor: "#2563eb", // blue-600 شفاف
    border: "2px solid #2563eb",
    color: "#fff",
  }),

  /* ✅ Active */
  ...(ownerState.active && {
    backgroundColor: "#2563eb", // blue-600
    color: "#fff",
    border: "2px solid #2563eb",
  }),

  /* ✅ Default */
  ...(!ownerState.active &&
    !ownerState.completed && {
      backgroundColor: "#fff",
      border: "1px solid #cbd5e1", // slate-300
      color: "#94a3b8", // slate-400
    }),
}));

function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  return (
    <StepIconRoot ownerState={{ active, completed }}>
      {completed ? <CheckIcon fontSize="small" /> : icon}
    </StepIconRoot>
  );
}

const RegisterStepper = () => {
  const { pathname } = useLocation();

  const getActiveStep = () => {
    if (pathname.includes("step1")) return 0;
    if (pathname.includes("step2")) return 1;
    if (pathname.includes("step3")) return 2;
    if (pathname.includes("step4")) return 3;
    return 0;
  };

  const activeStep = getActiveStep();

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<CustomConnector />}
      sx={{
        maxWidth: "900px",
        mx: "auto",
        mb: 6,
      }}
    >
      {steps.map((label, index) => (
        <Step key={label} completed={index < activeStep}>
          <StepLabel
            StepIconComponent={CustomStepIcon}
            sx={{
              "& .MuiStepLabel-label": {
                fontSize: 12,
                fontWeight: 600,
                mt: 1,
                color:
                  index === activeStep
                    ? "#2563eb"
                    : index < activeStep
                      ? "#2563eb"
                      : "#64748b",
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default RegisterStepper;
