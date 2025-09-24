"use client"

export const CryptoMarketplace = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Crypto Marketplace</h1>

      {/* Featured Crypto */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Featured Crypto</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <p>Display featured crypto information here.</p>
        </div>
      </section>

      {/* Top Movers */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Top Movers</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <p>Top Gainer</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p>Top Loser</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p>Most Traded</p>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Global Reach</h2>
        <p className="mb-2">Explore cryptocurrencies available worldwide.</p>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Bitcoin" className="mx-auto mb-1" />
            <p className="text-sm">Bitcoin</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Ethereum" className="mx-auto mb-1" />
            <p className="text-sm">Ethereum</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Litecoin" className="mx-auto mb-1" />
            <p className="text-sm">Litecoin</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Ripple" className="mx-auto mb-1" />
            <p className="text-sm">Ripple</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Cardano" className="mx-auto mb-1" />
            <p className="text-sm">Cardano</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Polkadot" className="mx-auto mb-1" />
            <p className="text-sm">Polkadot</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Solana" className="mx-auto mb-1" />
            <p className="text-sm">Solana</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Dogecoin" className="mx-auto mb-1" />
            <p className="text-sm">Dogecoin</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Shiba Inu" className="mx-auto mb-1" />
            <p className="text-sm">Shiba Inu</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Binance Coin" className="mx-auto mb-1" />
            <p className="text-sm">Binance Coin</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Tether" className="mx-auto mb-1" />
            <p className="text-sm">Tether</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="USD Coin" className="mx-auto mb-1" />
            <p className="text-sm">USD Coin</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="XRP" className="mx-auto mb-1" />
            <p className="text-sm">XRP</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Terra" className="mx-auto mb-1" />
            <p className="text-sm">Terra</p>
          </div>
          <div className="flex-shrink-0 w-16 text-center">
            <img src="https://via.placeholder.com/32" alt="Avalanche" className="mx-auto mb-1" />
            <p className="text-sm">Avalanche</p>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">News & Updates</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <p>Latest crypto news and updates.</p>
        </div>
      </section>
    </div>
  )
}
