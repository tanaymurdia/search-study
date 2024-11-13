import pandas as pd
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string

df = None

def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    tokens = nltk.word_tokenize(text.lower())
    tokens = [
        lemmatizer.lemmatize(token)
        for token in tokens
        if token.isalpha() and token not in stop_words
    ]
    return ' '.join(tokens)


def find_similar_rows( search_text, similarity_threshold=0.2):
    global df
    processed_search_text = preprocess_text(search_text)
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df['processed_text'])
    search_vector = vectorizer.transform([processed_search_text])
    similarity_scores = cosine_similarity(search_vector, tfidf_matrix).flatten()
    exact_matches = df[df['combined_text'].str.contains(search_text, case=False, na=False)]
    similar_indices = [(i, score) for i, score in enumerate(similarity_scores) if score >= similarity_threshold]
    similar_indices_sorted = sorted(similar_indices, key=lambda x: x[1], reverse=True)
    sorted_indices = [index for index, score in similar_indices_sorted]
    sorted_scores = [score for index, score in similar_indices_sorted]
    similar_rows_sorted = df.iloc[sorted_indices].copy()
    similar_rows_sorted['Similarity Score'] = sorted_scores
    combined_results = pd.concat([exact_matches, similar_rows_sorted]).drop_duplicates(subset=list(df.columns))
    combined_results = combined_results.drop(['processed_text', 'combined_text', 'Similarity Score'], axis=1)
    return combined_results
    

def preprocess_data(file_path):
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('wordnet')
    nltk.download('punkt_tab')
    global df
    df = pd.read_csv(file_path)
    df['combined_text'] = df[list(df.columns)].astype(str).fillna('').agg(' '.join, axis=1)
    df['processed_text'] = df['combined_text'].apply(preprocess_text)
    return df



