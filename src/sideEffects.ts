import 'dotenv/config'; // Side effect import to load env vars. Must be the first thing to do.
import '@/config/general'; // Side effect import to configure and setup app
import '@/config/db'; // Side effect import to configure and setup database
import '@/models'; // Side effect import to run database associations.
