from flask import Flask, request, jsonify
from flask_cors import CORS  # Импортируем CORS
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.vectorstores import Chroma
from langchain.llms import Ollama
import chromadb
import os
import time
from constants import CHROMA_SETTINGS

app = Flask(__name__)
CORS(app)  # Настраиваем CORS

model = os.environ.get("MODEL", "dimweb/ilyagusev-saiga_llama3_8b:Q6_K")
embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME", "all-MiniLM-L6-v2")
persist_directory = os.environ.get("PERSIST_DIRECTORY", "db")
target_source_chunks = int(os.environ.get('TARGET_SOURCE_CHUNKS', 4))

embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
retriever = db.as_retriever(search_kwargs={"k": target_source_chunks})

callbacks = []  # Modify this if you want to add callback handlers
llm = Ollama(model=model, callbacks=callbacks)

qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents=True)

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query = data.get("query")
    hide_source = data.get("hide_source", False)

    if not query:
        return jsonify({"error": "No query provided"}), 400

    start = time.time()
    res = qa(query + "\n Дай полный развернутый ответ на русском языке")
    answer, docs = res['result'], [] if hide_source else res['source_documents']
    end = time.time()

    response = {
        "question": query,
        "answer": answer,
        "time_taken": end - start
    }

    if not hide_source:
        response["sources"] = [{"source": doc.metadata["source"], "content": doc.page_content} for doc in docs]

    return jsonify(response)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
