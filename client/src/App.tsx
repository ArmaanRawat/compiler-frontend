import { Route, Switch } from 'wouter';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/index';
import DocsPage from './pages/docs';
import LanguagesPage from './pages/languages';
import CompilerView from './components/CompilerView';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout>
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/docs" component={DocsPage} />
            <Route path="/languages" component={LanguagesPage} />
            <Route path="/editor" component={CompilerView} />
          </Switch>
        </Layout>
        <Analytics />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;