import React, { useState } from 'react';
import HomePage from './components/pages/HomePage';
import PropertyDetail from './components/pages/PropertyDetail';
import About from './components/pages/About';
import DesignSystem from './components/pages/DesignSystem';
import { ContactModal } from './components/ui/contact-modal';
import { EmptyState } from './components/ui/empty-state';
import { PropertyGridSkeleton } from './components/ui/property-skeleton';
import { MillionButton } from './components/ui/million-button';
import { useDataService, useConnectionStatus } from './hooks/useProperties';
import { dataService } from './utils/dataService';
import { MOCK_PROPERTIES } from './utils/mockData';

type Page = 'home' | 'property' | 'about' | 'design-system' | 'search' | 'empty' | 'loading' | '404';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(true);

  // Data service hooks
  const { currentMode, switchToMock, switchToAPI, resetData, addSampleLead, health } = useDataService();
  const { status: connectionStatus } = useConnectionStatus();

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage('property');
  };

  const handleBackToHome = () => {
    setSelectedPropertyId(null);
    setCurrentPage('home');
  };

  const handleModeSwitch = () => {
    if (currentMode === 'mock') {
      switchToAPI();
    } else {
      switchToMock();
    }
  };

  const handleTestConnection = async () => {
    try {
      const result = await dataService.testConnection();
      console.log('Connection test result:', result);
    } catch (error) {
      console.error('Connection test failed:', error);
    }
  };

  const handleMigration = async () => {
    try {
      const result = await dataService.migrateToSupabase();
      console.log('Migration result:', result);
      if (result.success) {
        alert('Successfully migrated to Supabase API!');
      } else {
        alert(`Migration failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed with an error');
    }
  };

  const renderStatusIndicator = () => {
    const getStatusColor = () => {
      switch (connectionStatus) {
        case 'online': return 'bg-success';
        case 'mock': return 'bg-info';
        case 'offline': return 'bg-warning';
        case 'error': return 'bg-error';
        default: return 'bg-text-muted';
      }
    };

    const getStatusText = () => {
      switch (connectionStatus) {
        case 'online': return 'API Connected';
        case 'mock': return 'Mock Mode';
        case 'offline': return 'Offline';
        case 'error': return 'API Error';
        default: return 'Unknown';
      }
    };

    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${connectionStatus === 'mock' ? 'animate-pulse' : ''}`} />
        <span className="text-xs">{getStatusText()}</span>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPropertySelect={handlePropertySelect} />;
      case 'property':
        return (
          <PropertyDetail 
            propertyId={selectedPropertyId || MOCK_PROPERTIES[0].id} 
            onBack={handleBackToHome}
          />
        );
      case 'about':
        return <About />;
      case 'design-system':
        return <DesignSystem />;
      case 'search':
        return (
          <div className="min-h-screen bg-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-h2 font-brand text-text mb-8">Search Results</h1>
              <EmptyState 
                type="search"
                onAction={() => setCurrentPage('home')}
              />
            </div>
          </div>
        );
      case 'empty':
        return (
          <div className="min-h-screen bg-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-h2 font-brand text-text mb-8">My Favorites</h1>
              <EmptyState 
                type="favorites"
                onAction={() => setCurrentPage('home')}
              />
            </div>
          </div>
        );
      case 'loading':
        return (
          <div className="min-h-screen bg-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-h2 font-brand text-text mb-8">Loading Properties...</h1>
              <PropertyGridSkeleton count={8} />
            </div>
          </div>
        );
      case '404':
        return (
          <div className="min-h-screen bg-bg flex items-center justify-center">
            <EmptyState 
              type="404"
              onAction={() => setCurrentPage('home')}
            />
          </div>
        );
      default:
        return <HomePage onPropertySelect={handlePropertySelect} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Development Panel */}
      {showDevPanel && (
        <div className="fixed top-4 left-4 z-50 bg-surface-elev rounded-xl shadow-luxury-md p-4 space-y-3 max-w-[260px] border border-line/20">
          <div className="flex items-center justify-between">
            <h3 className="text-h6 font-brand text-text">MILLION Demo</h3>
            <button
              onClick={() => setShowDevPanel(false)}
              className="text-text-muted hover:text-text transition-colors p-1 rounded hover:bg-surface"
              aria-label="Close panel"
            >
              ×
            </button>
          </div>
          
          {/* Page Navigation */}
          <div className="space-y-2">
            <div className="text-xs text-text-muted mb-2 flex items-center">
              <div className="w-1 h-1 bg-accent rounded-full mr-2" />
              Pages
            </div>
            <MillionButton 
              variant={currentPage === 'home' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('home')}
            >
              🏠 Home
            </MillionButton>
            <MillionButton 
              variant={currentPage === 'property' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => {
                setSelectedPropertyId(MOCK_PROPERTIES[0].id);
                setCurrentPage('property');
              }}
            >
              🏢 Property Detail
            </MillionButton>
            <MillionButton 
              variant={currentPage === 'about' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('about')}
            >
              ℹ️ About
            </MillionButton>
            <MillionButton 
              variant={currentPage === 'design-system' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('design-system')}
            >
              🎨 Design System
            </MillionButton>
          </div>

          {/* States Section */}
          <div className="pt-2 border-t border-line space-y-2">
            <div className="text-xs text-text-muted mb-2 flex items-center">
              <div className="w-1 h-1 bg-accent rounded-full mr-2" />
              States
            </div>
            <MillionButton 
              variant={currentPage === 'search' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('search')}
            >
              🔍 No Results
            </MillionButton>
            <MillionButton 
              variant={currentPage === 'empty' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('empty')}
            >
              💔 Empty Favorites
            </MillionButton>
            <MillionButton 
              variant={currentPage === 'loading' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('loading')}
            >
              ⏳ Loading State
            </MillionButton>
            <MillionButton 
              variant={currentPage === '404' ? 'primary' : 'ghost'} 
              size="md" 
              className="w-full justify-start text-sm"
              onClick={() => setCurrentPage('404')}
            >
              ❌ 404 Page
            </MillionButton>
          </div>

          {/* Modal Test */}
          <div className="pt-2 border-t border-line">
            <div className="text-xs text-text-muted mb-2 flex items-center">
              <div className="w-1 h-1 bg-accent rounded-full mr-2" />
              Modals
            </div>
            <MillionButton 
              variant="outline" 
              size="md" 
              className="w-full text-sm"
              onClick={() => setIsContactModalOpen(true)}
            >
              📧 Contact Modal
            </MillionButton>
          </div>
          
          {/* Data Service Controls */}
          <div className="pt-2 border-t border-line space-y-2">
            <div className="text-xs text-text-muted mb-2 flex items-center">
              <div className="w-1 h-1 bg-accent rounded-full mr-2" />
              Data Service
            </div>
            
            <MillionButton 
              variant={currentMode === 'mock' ? 'primary' : 'outline'} 
              size="md" 
              className="w-full text-xs"
              onClick={handleModeSwitch}
            >
              {currentMode === 'mock' ? '🎭 Using Mock Data' : '🔌 Using API Data'}
            </MillionButton>

            <div className="grid grid-cols-2 gap-1">
              <MillionButton 
                variant="ghost" 
                size="md" 
                className="text-xs"
                onClick={resetData}
                disabled={currentMode !== 'mock'}
              >
                🔄 Reset
              </MillionButton>
              <MillionButton 
                variant="ghost" 
                size="md" 
                className="text-xs"
                onClick={addSampleLead}
                disabled={currentMode !== 'mock'}
              >
                👤 Add Lead
              </MillionButton>
            </div>

            <MillionButton 
              variant="ghost" 
              size="md" 
              className="w-full text-xs"
              onClick={handleTestConnection}
            >
              🔍 Test Connection
            </MillionButton>

            {currentMode === 'mock' && (
              <MillionButton 
                variant="accent" 
                size="md" 
                className="w-full text-xs"
                onClick={handleMigration}
              >
                🚀 Migrate to API
              </MillionButton>
            )}
          </div>
          
          {/* Status Indicator */}
          <div className="pt-2 border-t border-line">
            <div className="text-xs text-text-muted mb-2 flex items-center">
              <div className="w-1 h-1 bg-accent rounded-full mr-2" />
              Status
            </div>
            {renderStatusIndicator()}
            {health && (
              <div className="text-xs text-text-muted mt-1">
                Mode: {health.mode} | Status: {health.status}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show/Hide Dev Panel Button */}
      {!showDevPanel && (
        <button
          onClick={() => setShowDevPanel(true)}
          className="fixed top-4 left-4 z-50 bg-accent text-on-accent rounded-xl p-3 shadow-luxury-md hover:bg-accent/90 transition-colors border border-accent/20"
          aria-label="Show development panel"
        >
          <span className="text-sm font-medium">MILLION</span>
        </button>
      )}

      {/* Main Content */}
      {renderPage()}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyAddress="1234 Ocean Drive, Miami Beach"
        propertyId={selectedPropertyId || undefined}
      />
    </div>
  );
}