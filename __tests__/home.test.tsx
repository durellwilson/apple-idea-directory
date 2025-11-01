import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByText(/Infinite App Ideas/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders all platform cards', () => {
    render(<Home />);
    const platforms = ['iOS', 'macOS', 'iPadOS', 'watchOS', 'tvOS', 'visionOS', 'Web', 'AirPods'];
    platforms.forEach(platform => {
      const elements = screen.getAllByText(platform);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders featured ideas', () => {
    render(<Home />);
    expect(screen.getByText('MindfulMoments')).toBeInTheDocument();
    expect(screen.getByText('CodeSnippet Pro')).toBeInTheDocument();
    expect(screen.getByText('SpatialNotes')).toBeInTheDocument();
    expect(screen.getByText('FocusFlow')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Home />);
    expect(screen.getByText('Generate New Idea')).toBeInTheDocument();
    expect(screen.getByText('Explore Directory')).toBeInTheDocument();
  });
});
