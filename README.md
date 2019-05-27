# Summary  
英語論文を読むのがつらいので、読みやすくしてくれるプログラム  
以下の機能を持つ  
- pdfの無駄な改行除去  
- コンマごとに改行  
- 日本語訳  

# How to use 
input.txtに日本語訳したい文章を記述し以下のコマンドを実行する  
`cat input.txt | node --experimental-modules main.mjs`