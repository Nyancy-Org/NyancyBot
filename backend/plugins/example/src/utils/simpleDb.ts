import * as fs from "fs-extra";
import * as path from "path";

type DataEntry<T> = {
  value: T;
  expiry: number | null;
};

class SimpleDB<T> {
  public static readonly DATA_PATH = path.normalize(path.join(__dirname, "data"));
  private filePath: string;
  private data: Record<string, DataEntry<T>>;

  constructor(filePath?: string) {
    this.filePath = filePath || path.join(SimpleDB.DATA_PATH, "db.json");
    this.data = {};
    if (!fs.existsSync(this.filePath))
      if (fs.existsSync(this.filePath)) {
        // Load existing data if the file exists
        try {
          const fileContent = fs.readFileSync(this.filePath, "utf-8");
          this.data = JSON.parse(fileContent);

          // Remove expired entries on initialization
          this._removeExpiredEntries();
        } catch (err) {
          console.error("Failed to load data, starting with an empty database:", err);
        }
      } else {
        fs.mkdirsSync(SimpleDB.DATA_PATH);
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 4), { encoding: "utf-8" });
      }
  }

  // Get a value by key
  get(key: string): T | null {
    const entry = this.data[key];
    if (entry) {
      // Check if the entry is expired
      if (entry.expiry && Date.now() > entry.expiry) {
        this.remove(key); // Automatically remove expired entry
        return null;
      }
      return entry.value;
    }
    return null;
  }

  // Set a value by key with optional expiry time (in milliseconds)
  set(key: string, value: T, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl : null;
    this.data[key] = { value, expiry };
    this._save();
  }

  // Remove a key-value pair
  remove(key: string): void {
    if (key in this.data) {
      delete this.data[key];
      this._save();
    }
  }

  // Clear all data
  clear(): void {
    this.data = {};
    this._save();
  }

  // Remove expired entries from the data
  private _removeExpiredEntries(): void {
    const now = Date.now();
    for (const key in this.data) {
      if (this.data[key].expiry && now > this.data[key].expiry) {
        delete this.data[key];
      }
    }
    this._save();
  }

  // Save the current data to the file
  private _save(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save data:", err);
    }
  }
}

export default new SimpleDB();
