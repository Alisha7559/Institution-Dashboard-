export default function componentStyleOverrides() {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#76afd0', 
          color: '#FFFFFF' 
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '&.Mui-selected': {
            color: '#0F3A2D', 
            backgroundColor: '#fff', 
            '&:hover': {
              backgroundColor: '#901c1c' 
            },
            '& .MuiListItemIcon-root': {
              color: '#0F3A2D' 
            }
          },
          // '&:hover': {
          //   backgroundColor: '#fff', 
          //   color: '#0F3A2D',
          //   '& .MuiListItemIcon-root': {
          //     color: '#0F3A2D'
          //   }
          // }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#FFFFFF'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#FFFFFF' 
        }
      }
    }
  };
}
