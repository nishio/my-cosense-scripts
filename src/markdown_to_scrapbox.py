"""
from ChatGPT markdown to Scrapbox-format

"""

TEST_IN_1 = """
...
"""
import re


def convert_to_scrapbox(text):
    lines = text.split("\n")
    scrapbox_lines = []

    current_indent_level = 0
    for line in lines:
        stripped_line = line.lstrip()
        new_indent_level = (
            len(line) - len(stripped_line)
        ) // 2  # Assuming 2 spaces per indent level
        if new_indent_level > current_indent_level:
            current_indent_level += 1
        elif new_indent_level < current_indent_level:
            current_indent_level -= 1
        # Convert headings
        if line.startswith("## "):
            line = "[*** " + line[3:] + "]"
        elif line.startswith("### "):
            line = "[** " + line[4:] + "]"
        # Convert bold text
        elif "**" in line:
            line = re.sub(r"\*\*(.*?)\*\*", r"[* \1]", line)
        # Convert bullet points based on leading spaces
        leading_spaces = len(line) - len(line.lstrip(" "))
        body = line.lstrip(" ").lstrip("-")
        if body:
            bullet_point = " " * current_indent_level + body
        else:
            bullet_point = ""
        scrapbox_lines.append(bullet_point)

    return "\n".join(scrapbox_lines)


# Example usage
scrapbox_text = convert_to_scrapbox(TEST_IN_1)
print(scrapbox_text)
