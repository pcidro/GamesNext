import { useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Thunderstorm from "@mui/icons-material/Thunderstorm";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import Sports from "@mui/icons-material/Sports";
import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import Castle from "@mui/icons-material/Castle";
import Explore from "@mui/icons-material/Explore";
import Computer from "@mui/icons-material/Computer";
import SportsEsports from "@mui/icons-material/SportsEsports";
import Gamepad from "@mui/icons-material/Gamepad";
import VideogameAsset from "@mui/icons-material/VideogameAsset";
import Person from "@mui/icons-material/Person";
import Favorite from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

interface MenuItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const genres: MenuItemData[] = [
  {
    id: "action",
    label: "Ação",
    icon: <Thunderstorm fontSize="small" />,
  },
  {
    id: "role-playing-games-rpg",
    label: "RPG",
    icon: <AutoAwesome fontSize="small" />,
  },
  {
    id: "sports",
    label: "Esportes",
    icon: <Sports fontSize="small" />,
  },
  {
    id: "shooter",
    label: "Tiro",
    icon: <LocalFireDepartment fontSize="small" />,
  },
  {
    id: "fighting",
    label: "Luta",
    icon: <Castle fontSize="small" />,
  },
  {
    id: "adventure",
    label: "Aventura",
    icon: <Explore fontSize="small" />,
  },
];

const platforms: MenuItemData[] = [
  {
    id: "2",
    label: "PlayStation",
    icon: <Gamepad fontSize="small" />,
  },
  {
    id: "3",
    label: "Xbox",
    icon: <SportsEsports fontSize="small" />,
  },
  {
    id: "7",
    label: "Nintendo",
    icon: <VideogameAsset fontSize="small" />,
  },
];

const account: MenuItemData[] = [
  {
    id: "profile",
    label: "Perfil",
    icon: <Person fontSize="small" />,
  },
  {
    id: "favorites",
    label: "Meus Favoritos",
    icon: <Favorite fontSize="small" />,
  },
];

export default function IconMenu() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "transparent",
        color: "#fff",
        boxShadow: "none",
        backgroundImage: "none",
      }}
    >
      <MenuList>
        <Typography
          component="h1"
          sx={{
            color: "rgba(255,255,255,0.5)",
            px: 2,
            pt: 1,
            pb: 1,
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Categorias
        </Typography>

        {genres.map((genre) => {
          const isSelected = selected === genre.id;

          return (
            <MenuItem
              key={genre.id}
              selected={isSelected}
              onClick={() => {
                setSelected(genre.id);
                router.push(`/results?genre=${genre.id}`);
              }}
              sx={{
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                "&.Mui-selected": {
                  backgroundColor: "rgba(0, 255, 127, 0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 255, 127, 0.25)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#00FF7F" }}>
                {genre.icon}
              </ListItemIcon>
              <ListItemText>{genre.label}</ListItemText>
            </MenuItem>
          );
        })}

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

        <Typography
          component="h1"
          sx={{
            color: "rgba(255,255,255,0.5)",
            px: 2,
            pt: 1,
            pb: 1,
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Plataformas
        </Typography>

        {platforms.map((platform) => {
          const isSelected = selected === platform.id;

          return (
            <MenuItem
              key={platform.id}
              selected={isSelected}
              onClick={() => {
                setSelected(platform.id);
                router.push(`/results?platform=${platform.id}`);
              }}
              sx={{
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                "&.Mui-selected": {
                  backgroundColor: "rgba(0, 255, 127, 0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 255, 127, 0.25)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#00FF7F" }}>
                {platform.icon}
              </ListItemIcon>
              <ListItemText>{platform.label}</ListItemText>
            </MenuItem>
          );
        })}

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

        <Typography
          component="h1"
          sx={{
            color: "rgba(255,255,255,0.5)",
            px: 2,
            pt: 1,
            pb: 1,
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Minha Conta
        </Typography>

        {account.map((item) => {
          const isSelected = selected === item.id;

          return (
            <MenuItem
              key={item.id}
              selected={isSelected}
              onClick={() => setSelected(item.id)}
              sx={{
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                "&.Mui-selected": {
                  backgroundColor: "rgba(0, 255, 127, 0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 255, 127, 0.25)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#00FF7F" }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
}
