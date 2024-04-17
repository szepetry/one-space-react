import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Drawer, List, Box, IconButton } from '@mui/material';
import { NavbarButton } from './NavbarButton';
import "../../css/navbar.css"

const burgerStyle = {
    color: "white", border: "1px solid grey", fontSize: "x-large", borderRadius: "5px"
};

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        let path = location.pathname
        if (path === '/') {
            navigate('/search/home')
        }

        if (path === '/' || path === '/search/home')
            setSearchQuery('/search/home')
    },[location.pathname, navigate]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <div style={{ paddingBottom: drawerOpen ? '150px' : '0' }}>
            <AppBar position="static" color="deepkoamaru">
                <Toolbar>
                    <Typography className="navbar-button-color" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        One Space
                    </Typography>
                    {/* Burger menu icon */}
                    {/* <IconButton
                        size="medium"
                        edge="end"
                        color="inherit"
                        aria-label="Nothing"
                        sx={{ display: { sm: 'none' } }}
                        onClick={toggleDrawer(!drawerOpen)}
                    >
                        <Box component="span" className="material-icons">
                            {drawerOpen ? <i style={burgerStyle} className="bi bi-list"></i> : <i style={burgerStyle} className="bi bi-list"></i>}
                        </Box>
                    </IconButton> */}
                    {/* Navbar buttons */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {/* <NavbarButton
                            button_name="Search"
                            route_url="/search/home"
                            is_selected={searchQuery.includes("search")}
                        /> */}
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Drawer for smaller screens */}
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                variant="temporary"
                ModalProps={{ BackdropProps: { invisible: true } }}
                sx={{
                    '& .MuiDrawer-paper': {
                        top: '55px',
                        width: '100%',
                    },
                }}
            >
                <List style={{ backgroundColor: "#16148b", display: "flex", flexDirection: "column" }}>
                    <NavbarButton
                        button_name="Search"
                        route_url="/search/home"
                        is_selected={searchQuery.includes("search")}
                    />
                </List>
            </Drawer>
        </div>
    );
}
