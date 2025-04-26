enum WalletType {
    metamask = "META_MASK",
    wallet_connect = "WALLET_CONNECT",
  }
  enum UserAction {
    delete = "Delete",
    deactivate = "Deactivate",
  }
  
  enum Accontverify {
    APPROVED = 'APPROVED',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED'
  }
  
  enum SocialType {
    NORMAL = 'NORMAL',
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK'
  }
  enum UserType {
    user = "user",
    artist = "artist",
  }
  enum PaymentType {
    googlePay = 'googlePay',
    applePay = 'applePay',
  }
  enum SearchTypes {
    album = "album",
    song = "song",
    artist = "artist",
    top_artist = "top_artist",
    topArtist = "artist",
    allmusic = "all-music",
    preOrder = "pre-order",
    newReleases = "new-releases",
  }
  // ['all','amount_spent','quantity_of_songs', 'quantity_of_videos', 'quantity_of_rewards']
  enum TopFansFilter {
    all = "all",
    amountSpent = "amount_spent",
    quantityOfSongs = "quantity_of_songs",
    quantityOfVideos = "quantity_of_videos",
    quantityOfRewards = "quantity_of_rewards"
  
  }
  
  enum VideoScope {
    user = 'USER',
    artist = 'ARTIST',
  }
  enum VideoPageName {
    Auth = 'AUTH',
    Homepage = 'HOMEPAGE',
    Watch = 'WATCH'
  }
  
  enum AuthPageSections {
    Auth = 'AUTH',
  }
  
  enum HomePageSections {
    Banner = 'BANNER',
    DiscoverOurArtist = 'DISCOVER_OUR_ARTISTS',
    BecomeArtist = 'BECOME_ARTIST'
  }
  
  enum WatchPageSections {
    Banner = 'BANNER',
  }
  
  
  
  export default {
    WalletType,
    UserType: UserType,
    UserAction,
    Search: SearchTypes,
    Accontverify,
    PaymentType,
    SocialType,
    TopFansFilter,
    VideoScope,
    VideoPageName,
    AuthPageSections,
    HomePageSections,
    WatchPageSections
  };
  