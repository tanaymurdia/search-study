# Study Search App

This project is a web application for searching and viewing clinical studies. Users can enter search terms, view study details, and expand each study entry for more information.

## Features

- **Search Functionality**: Allows users to search for clinical studies using specific keywords.
- **Expandable Study Entries**: Users can expand each study entry to view additional details.
- **Study Details**: Each study entry includes the study title, a button to visit the study URL, and the start date.

## Screenshots
- Search View
![Search Study Screenshot](https://github.com/user-attachments/assets/18e704d2-9a03-45ed-9ec0-533517727f41)
- Expanded View
![image](https://github.com/user-attachments/assets/ee41d76f-7dea-4f67-9cc3-29d619938346)



## Python Service

To install packages listed in a `service\requirements.txt` file using `pip`, you can follow these simple steps:

### Step 1: Ensure Python and Pip are Installed

Before proceeding, make sure that Python and `pip` are installed on your system. You can verify this by running:

```bash
python --version
pip --version
```

If these commands return a version number, then Python and `pip` are installed. If not, you'll need to install them.

### Step 2: Install Packages from `requirements.txt`

Use the following command to instruct `pip` to install all of the packages listed in `service\requirements.txt`:

```bash
pip install -r service\requirements.txt
```

### Additional Tips:

- **Virtual Environment**: It is best practice to use a virtual environment to create an isolated environment for your project dependencies. This helps prevent dependency conflicts across projects. To create and activate a virtual environment, use the following commands:

  - **Create a Virtual Environment**: (assuming you want to create it in the current directory)

    ```bash
    python -m venv env
    ```

  - **Activate the Virtual Environment**:
    - On Windows:

      ```bash
      .\env\Scripts\activate
      ```

    - On macOS and Linux:

      ```bash
      source env/bin/activate
      ```

- **Checking Installations**: After installation, you can verify the installed packages using:

  ```bash
  pip list
  ```

These steps should guide you through installing the required packages for your project using a `requirements.txt` file.

### Starting the Service

To start the service, execute the following command:

```bash
python service/app.py
```

## React Application

### Available Scripts

Within the project directory, you have access to the following commands:

#### `npm start`

This command runs the app in development mode.\
Navigate to [http://localhost:3000](http://localhost:3000) to see it in your browser.

#### `npm run build`

This command builds the app for production, outputting to the `build` directory.\
It properly bundles React in production mode and optimizes the build for enhanced performance.

The build output is minified, and filenames include hashes for cache management.\
Your app is now ready for deployment!

# Bonus

### NSCLC has many different representations in the dataset. For example, it could be “non small cell lung cancer”, “non small cell lung carcinoma”, “NSCLC”, “carcinoma of the lungs, non small cell”, etc. How do we capture all the relevant clinical trials for searches on any disease?

In the provided code, I aim to capture all relevant clinical trials for searches, especially when dealing with diseases that have multiple representations or synonyms in the dataset. For instance, terms like "non small cell lung cancer", "NSCLC", and "carcinoma of the lungs, non small cell" can all refer to the same condition but are expressed differently in data. Here's how the code addresses this challenge:

1. **Text Preprocessing:**
   - **Lowercasing & Tokenization:** The `preprocess_text` function standardizes the text by converting it to lowercase and tokenizing it into words.
   - **Stop Word Removal & Lemmatization:** It removes common stop words (e.g., "and", "is", "in") and lemmatizes the tokens to their base form (e.g., "carcinomas" to "carcinoma"). This standardizes text and reduces variations in word forms.
   
2. **Combining Text from All Columns:**
   - The `preprocess_data` function creates a new column `combined_text` that amalgamates text from all available columns. This ensures that no potential information is overlooked due to its position in the dataset.

3. **Vectorization and Similarity Calculation:**
   - The `find_similar_rows` function employs `TfidfVectorizer` to convert processed texts into numerical vectors, allowing for computational comparisons.
   - It uses `cosine_similarity` to compute similarity scores between the search text vector and each data row vector. This helps in identifying rows that are textually similar to the search query, considering variations and synonyms effectively.

4. **Handling Exact Matches and Similar Terms:**
   - The function identifies both exact matches and rows with high similarity scores, ensuring that variations in terminology are captured.
   - A similarity threshold parameter (e.g., `0.2`) allows to control the sensitivity of similarity detection, potentially capturing more diverse representations of the same disease.

### Example: NSCLC Representation

For a search involving "non small cell lung cancer", the code will preprocess this to a standardized form and efficiently retrieve related rows from the dataset that might include other variations like "NSCLC" or "lung carcinoma, non small cell". The combination of exact string matching and similarity-based retrieval ensures comprehensive coverage.

### Usage

- **Preprocessing Data:**
  - Use `preprocess_data(file_path)` to preprocess and prepare the dataset.
  
- **Searching for Related Entries:**
  - Call `find_similar_rows(search_text, similarity_threshold)` to retrieve and view all relevant entries for the disease of interest, considering synonyms and different representations.

##### How do we allow her to search for NSCLC trials -AND- immunotherapy related drugs?

In scenarios where performing more complex searches, such as finding NSCLC trials that specifically involve immunotherapy-related drugs, the functionality can be extended to handle compound queries. Below are some considerations for allowing such advanced searches based on the existing code framework:

1. **Logical Operators in Search:**
   - Extend the `find_similar_rows` function to handle logical combinations such as "AND", "OR", etc., within the combined search query. This can be achieved by processing each component separately and ensuring both conditions are considered when calculating similarity.


### How would you deploy your software?

1. **Backend Deployment (Python):**

   - **Environment Setup:**
     - Choose a cloud service provider (e.g., AWS, Google Cloud Platform, Azure, Heroku) or a VPS provider (e.g., DigitalOcean).
     - Set up the server environment with Python, necessary packages, and dependencies by using `virtualenv` or `conda` for isolation.

   - **Database Configuration:**
     - Set up and configure a database server (e.g., PostgreSQL, MySQL).
     - Manage migrations and initial data setup.

   - **Reverse Proxy Setup:**
     - Use a reverse proxy (like Nginx or Apache) in front of the application servers. This handles SSL termination and potentially serves static files.

   - **Deployment Tools:**
     - Use tools like Docker for creating container images or Ansible for server management and configuration.

2. **Frontend Deployment (React):**

   - **Build Process:**
     - Run a production build of the React app using `npm run build` or `yarn build`. This command generates static files optimized for production.

   - **Static File Hosting:**
     - Serve static files from a CDN or a service designed for static content delivery, such as AWS S3 with CloudFront, Netlify, or Vercel.
     - Ensure server can correctly serve these files.

   - **Environment Variables:**
     - Configure environment variables necessary for the React application, like API endpoints or feature flags, often set at build time.
    
### What are the alternatives to loading the dataset into memory, and why would you want to use those alternatives?

I would use the following alternatives:

1. **Database Systems**
   - **SQL Databases (PostgreSQL, MySQL, SQLite):** Store and manage datasets efficiently with structured querying capabilities.
   - **NoSQL Databases (MongoDB, Cassandra):** Handle large volumes of unstructured data with flexible schemas.

2. **Data Processing Frameworks**
   - **Apache Spark:** Utilize distributed computing to process datasets larger than memory across multiple nodes.
   - **Dask:** Leverage parallel computing in Python to manage large datasets by breaking them into manageable chunks.

3. **Chunking and Iteration**
   - Use libraries such as Pandas to read datasets in chunks (`pd.read_csv(chunk_size=...)`), allowing processing of segments one at a time to optimize memory usage.
  

### How do we evaluate completeness of results?

1. **Precision and Recall:**
   - **Precision** refers to the proportion of relevant results out of the total results returned. In code context, I can focus on filtering results through similarity scoring where only scores above the specified threshold are considered to improve precision by eliminating less relevant results.
   - **Recall** measures how many relevant results are retrieved from the entire dataset. Adjusting `similarity_threshold` can affect recall. If the threshold is too high, it may miss relevant results; too low, and it may introduce noise.

2. **F1 Score:**
   - The F1 score is the harmonic mean of precision and recall, providing a singular metric to balance both aspects. I can create a small evaluation dataset to compute these scores and assess how well the search function performs.

3. **Relevance Feedback:**
   - Incorporating user feedback to refine matching algorithms can be insightful. I could log user interactions with search results and adaptively adjust weights or thresholds based on this feedback to improve accuracy over time.

