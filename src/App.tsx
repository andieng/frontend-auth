import { useCookies } from 'react-cookie';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'src/routes';

function App() {
    const [cookie] = useCookies(["role"])

    let isAuthenticated = false;
    if (cookie.role) {  
        isAuthenticated = true;
    }
    return (
        <div className="App">
            <Routes>
                {/* <> */}
                    {publicRoutes.map((route, index) => {
                        let Element;
                        if (isAuthenticated && route.path !== "/") {
                            Element = <Navigate to="/" />
                        } else {
                            const Page = route.page
                            Element = <Page />
                        }
                        return <Route key={index} path={route.path} element={Element} />
                    })}
                    {privateRoutes.map((route, index) => {
                        let Element;
                        if (!isAuthenticated) {
                            Element = <Navigate to="/login" />
                        } else {
                            const Page = route.page
                            Element = <Page />
                        }
                        return <Route key={index} path={route.path} element={Element} />
                    })}
            </Routes>
        </div>
    );
}

export default App;
