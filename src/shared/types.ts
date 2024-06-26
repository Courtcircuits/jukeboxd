interface Song {
  title: string;
  artist: string;
  description?: string;
  genre: string;
}

interface Genre {
  name: string;
  adminId: string;
}

interface User {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
}

interface Post {
  senderId: string;
  content: string;
}
