import { AppBar, Input, Toolbar, Typography } from "@mui/material";

interface PropTypes {
  onNoteSearch: (searchTerm: string) => void;
  searchText?: string;
}

export const Header = ({
  onNoteSearch,
  searchText,
}: PropTypes) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNoteSearch(event.target.value);
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notes
        </Typography>
        <Input 
        placeholder="Search..." 
        sx={{backgroundColor: 'white', paddingLeft: 1, paddingRight: 1}} 
        onChange={handleSearchChange}
        value={searchText}
        />
      </Toolbar>
    </AppBar>
  );
};
