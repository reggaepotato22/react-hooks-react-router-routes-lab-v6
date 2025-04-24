import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Movie from '../pages/Movie';

// This is the key fix - import the actual createMemoryRouter before mocking
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' })
  };
});

const routes = [
  {
    path: '/movie/:id',
    element: <Movie />,
  },
];

describe('<Movie />', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/movie/1'],
    initialIndex: 0,
  });

  test("renders without any errors", () => {
    const errorSpy = vi.spyOn(global.console, "error");
    render(<RouterProvider router={router} />);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test("renders movie's title in an h1", async () => {
    render(<RouterProvider router={router} />);
    const h1 = await screen.findByText(/Doctor Strange/);
    expect(h1).toBeInTheDocument();
    expect(h1.tagName).toBe("H1");
  });

  test("renders movie's time within a p tag", async () => {
    render(<RouterProvider router={router} />);
    const p = await screen.findByText(/115/);
    expect(p).toBeInTheDocument();
    expect(p.tagName).toBe("P");
  });

  test("renders a span for each genre", async () => {
    render(<RouterProvider router={router} />);
    const genres = ["Action", "Adventure", "Fantasy"];
    for (const genre of genres) {
      const span = await screen.findByText(genre);
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe("SPAN");
    }
  });

  test("renders the <NavBar /> component", async () => {
    render(<RouterProvider router={router} />);
    expect(await screen.findByRole("navigation")).toBeInTheDocument();
  });
});