import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { FC } from "react";

interface IProps {
  openModal: () => void;
}

export const AddNoteFab: FC<IProps> = ({ openModal }) => {
  return (
    <Fab
      color="primary"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      onClick={openModal}
    >
      <AddIcon />
    </Fab>
  );
};
