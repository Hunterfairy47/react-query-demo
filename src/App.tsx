import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Home';
import { SuperHeroesPage } from './components/SuperHeroes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RQSuperHeroes } from './components/RQSuperHeroes';
import { ReactQueryDevtools} from "react-query/devtools"
import { RQSuperHero } from './components/RQSuperHero';
import { ParallelQueries } from './components/ParallelQueries';
import { DynamicParallel } from './components/DynamicParallel';
import { DependentQueries } from './components/DependentQueries';

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/super-heroes'>Super heroes</Link>
          </li>
          <li>
            <Link to='/rq-super-heroes'>RQ Super heroes</Link>
          </li>
          <li>
            <Link to='/rq-parallel'>RQ Parallel</Link>
          </li>
         
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/super-heroes" element={<SuperHeroesPage />}/>
        <Route path="/rq-parallel" element={<ParallelQueries />}/>
        <Route path="/rq-dependent" element={<DependentQueries email='an.nguyen@hdwebsoft.io' />}/>
        <Route path="/rq-dynamic-parallel" element={<DynamicParallel heroIds={[1,3]} />}/>
        <Route path="/rq-super-heroes" element={<RQSuperHeroes />}/>
        <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
      </Routes>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  );
}


export default App;
