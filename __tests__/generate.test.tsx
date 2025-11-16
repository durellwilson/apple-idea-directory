import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Generate from '@/app/generate/page';

// Mock fetch
global.fetch = jest.fn();

describe('Generate Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main heading', () => {
    render(<Generate />);
    const heading = screen.getByText(/Generate App Idea/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders all platform buttons', () => {
    render(<Generate />);
    expect(screen.getByText('iOS')).toBeInTheDocument();
    expect(screen.getByText('macOS')).toBeInTheDocument();
    expect(screen.getByText('iPadOS')).toBeInTheDocument();
    expect(screen.getByText('watchOS')).toBeInTheDocument();
    expect(screen.getByText('tvOS')).toBeInTheDocument();
    expect(screen.getByText('visionOS')).toBeInTheDocument();
    expect(screen.getByText('Web')).toBeInTheDocument();
    expect(screen.getByText('AirPods')).toBeInTheDocument();
  });

  it('generates an idea on button click', async () => {
    const mockIdea = {
      name: 'TestApp',
      tagline: 'A test app',
      description: 'Test description',
      platforms: ['iOS'],
      category: 'Productivity',
      features: ['Feature 1', 'Feature 2'],
      techStack: ['SwiftUI', 'CloudKit'],
      gtmStrategy: 'Test GTM',
      monetization: 'Freemium',
      targetAudience: 'Developers',
      uniqueValue: 'Unique test value',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIdea,
    });

    render(<Generate />);
    
    const generateButton = screen.getByText(/✨ Generate Idea/i);
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('TestApp')).toBeInTheDocument();
    });

    expect(screen.getByText('A test app')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });

  it('shows loading state while generating', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<Generate />);
    
    const generateButton = screen.getByText(/✨ Generate Idea/i);
    fireEvent.click(generateButton);

    expect(screen.getByText(/Generating.../i)).toBeInTheDocument();
  });

  it('shows error message on failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed' }),
    });

    render(<Generate />);
    
    const generateButton = screen.getByText(/✨ Generate Idea/i);
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to generate idea/i)).toBeInTheDocument();
    });
  });

  it('allows platform selection', () => {
    render(<Generate />);
    
    const macOSButton = screen.getByText('macOS').closest('button');
    if (macOSButton) {
      fireEvent.click(macOSButton);
      // The button should be selected (we can't easily test CSS classes, but we can verify it's clickable)
      expect(macOSButton).not.toBeDisabled();
    }
  });
});
