// import { Component } from 'react';
// import { Button } from './Button/Button';
// import { fetchMovies } from 'services/moviesApi';
// import { MoviesList } from './MoviesList/MoviesList';
// import { useState } from 'react';

// export class App extends Component {
//   state = {
//     movies: [],
//     isListShown: false,
//     isLoading: false,
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { isListShown, page } = this.state;
//     if (
//       (prevState.isListShown !== isListShown || page !== prevState.page) &&
//       isListShown
//     ) {
//       this.setState({ isLoading: true });
//       fetchMovies(page)
//         .then(({ data: { results } }) => {
//           this.setState(prevState => {
//             return { movies: [...prevState.movies, ...results] };
//           });
//         })
//         .catch(error => console.log(error))
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }

//     if (prevState.isListShown !== isListShown && isListShown === false) {
//       this.setState({ movies: [], page: 1 });
//     }
//   }

//   onVisibilityChanged = () => {
//     this.setState(prevState => {
//       return { isListShown: !prevState.isListShown };
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { isListShown, movies } = this.state;
//     return (
//       <>
//         <Button
//           clickHandler={this.onVisibilityChanged}
//           text={isListShown ? 'Hide movied list' : 'Shown movies list'}
//         />
//         {isListShown && (
//           <>
//             <MoviesList movies={movies} />{' '}
//             <Button text="Load more" clickHandler={this.loadMore} />
//           </>
//         )}
//       </>
//     );
//   }
// }
// import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'services/moviesApi';
import { MoviesList } from './MoviesList/MoviesList';
import { useState } from 'react';
import { useEffect } from 'react';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [isListShown, setIsListShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isListShown === true) {
      setIsLoading(true);
      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prev => [...prev, ...results]);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
    if(isListShown === false) {
      setMovies([]);
      setPage(1);
    }
  }, [isListShown, page]);
 

  const onVisibilityChanged = () => {
    setIsListShown(prev => !prev);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Button
        clickHandler={onVisibilityChanged}
        text={isListShown ? 'Hide movied list' : 'Shown movies list'}
      />
      {isListShown && (
        <>
          <MoviesList movies={movies} />{' '}
          {!isLoading && <Button text="Load more" clickHandler= { loadMore } />}
        </>
      )}
       {isLoading && <Loader/>}
    </>
  );
};
