import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Directors from '../pages/Directors';

const directors = [
  {
    name: "Mike Mitchell",
    movies: ["Trolls", "Sky High"],
  },
  {
    name: "Jennifer Lee",
    movies: ["Frozen", "Frozen II"],
  },
];

describe('<Directors />', () => {
  it("renders 'Directors Page' inside of a <h1 />", () => {
    render(
      <MemoryRouter>
        <Directors />
      </MemoryRouter>
    );
    const headingElement = screen.getByRole('heading', { name: /Directors Page/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders each director\'s name', () => {
    render(
      <MemoryRouter>
        <Directors />
      </MemoryRouter>
    );
    directors.forEach((director) => {
      const nameElement = screen.getByRole('heading', { name: director.name });
      expect(nameElement).toBeInTheDocument();
    });
  });

  it('renders a <ul> for the movies of each director', () => {
    render(
      <MemoryRouter>
        <Directors />
      </MemoryRouter>
    );
    directors.forEach((director) => {
      const movieList = screen.getByRole('list', { name: `${director.name}'s movies` });
      expect(movieList).toBeInTheDocument();
      director.movies.forEach((movie) => {
        expect(screen.getByText(movie, { container: movieList })).toBeInTheDocument();
      });
    });
  });

  it('renders the <NavBar /> component', () => {
    render(
      <MemoryRouter>
        <Directors />
      </MemoryRouter>
    );
    const navBarElement = screen.getByRole('navigation');
    expect(navBarElement).toBeInTheDocument();
  });
});