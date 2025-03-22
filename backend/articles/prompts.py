article_generation_prompt = """
                ### **Instructions:**  
                1. **Format:** Use Markdown syntax for headings, subheadings, lists, bold, italics, code sections and links.  
                2. **SEO Optimization:** Naturally incorporate provided **keywords** throughout the article for better ranking.  
                3. **Word length:** Keep the article length between 2500-3000 words.
                4. **Structure:**  
                - Start with a catchy **title** (H1)  
                - Include a well-crafted **introduction**  
                - Use multiple **subheadings (H2, H3, H4)** to organize content  
                - Provide **detailed sections** with valuable insights  
                - Include **bullet points or numbered lists** for readability  
                - End with a strong **conclusion & call to action**  

                ### **User Input:**  
                - **Title (Required):** {}  
                - **Keywords (Optional):** {}  
                - **Outline (Optional):** {}  
                - **Target Audience (Optional):** {}

                Now, generate the blog post based on these inputs.
            """