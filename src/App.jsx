
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { userMe } from 'container/LoginContainer/slice';
import { useSelector, useDispatch } from 'react-redux';
// routing
import router from 'routes';



// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    //   const dispatch = useDispatch();


    // useEffect(() => {
    
    //     dispatch(userMe());
    // }, [dispatch]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <RouterProvider router={router} />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
