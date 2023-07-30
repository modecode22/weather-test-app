// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::Error;
use tokio::runtime::Runtime;



#[tauri::command]
async fn fetch_html_command(url: String) -> Result<String, String> {
    fetch_html(url).await.map_err(|err| err.to_string())
}

async fn fetch_html(url: String) -> Result<String, Error> {
    let client = reqwest::Client::new();
    let response = client.get(&url).send().await?;
    let html = response.text().await?;
    Ok(html)
}

fn main() {
    let  _rt = Runtime::new().expect("Failed to create Tokio runtime");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_html_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}