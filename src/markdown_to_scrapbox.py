"""
from ChatGPT markdown to Scrapbox-format

"""

TEST_IN_1 = """
「ある」と「なる」に関する思想は、哲学や言語学において重要なテーマとして扱われてきた。それぞれの概念は、「存在」と「変化（生成）」という根本的な考え方を示し、多くの哲学者がこれについて考察してきた。

---

### 1. **古代ギリシャ哲学**
#### ◉ パルメニデス（存在論的アプローチ）
- 「あるものはある、ないものはない」と述べ、存在（ある）が絶対的なものであり、変化（なる）は幻想にすぎないと主張した。
- 彼にとって、真実の世界は変化せず、永遠不変である。

#### ◉ ヘラクレイトス（生成変化の哲学）
- 「万物は流転する（πάντα ῥεῖ）」という言葉で知られ、世界は常に「なる（変化する）」ことによって成り立つと考えた。
- 「ある」は一瞬の状態にすぎず、実在は変化の連続にあるとした。

---

### 2. **アリストテレスと形相と質料**
- アリストテレスは「ある（存在）」を**「エネルゲイア（現実態）」**とし、「なる（生成変化）」を**「デュナミス（可能態）」**と捉えた。
- 物事は「デュナミス（可能性）」を持ち、それが「エネルゲイア（現実化）」することで変化すると説明した。

---

### 3. **仏教の「縁起」と「空」**
- 仏教では、固定的な「ある（実体）」を認めず、すべてのものは**「縁起（依存関係によって生じる）」**によって「なる」ものとする。
- 「空（くう）」の思想では、独立した実体（ある）はなく、あらゆるものが条件によって変化し続けるものと見なされる。

---

### 4. **近代哲学**
#### ◉ ヘーゲル（弁証法）
- 「ある」と「なる」を「正」「反」「合」の弁証法で捉え、絶対精神の発展として説明した。
- 「存在（ある）」は自己否定を通じて「無（ない）」に移行し、その対立が統合されて「生成（なる）」に至る。

#### ◉ ニーチェ（生成の肯定）
- 「ある」という固定観念を批判し、「生成（なる）」の過程を肯定した。
- 「永遠回帰」という考え方では、変化こそが本質であり、「なる」ことを積極的に受け入れることが重要だと説いた。

---

### 5. **20世紀以降の哲学**
#### ◉ ハイデガー（存在と時間）
- 「ある（存在）」を時間的なものとして捉え、「なる（生成）」と不可分のものとした。
- 「本来的な存在」とは、変化や未来を見据えながら自己を形成していくものとした。

#### ◉ ドゥルーズ（差異と生成）
- 固定的な「ある（実体）」の概念を批判し、「差異」こそが現実の本質だと主張。
- 「なる」という過程を重要視し、世界は常に新しいものが生み出される「生成変化の場」と考えた。

---

### まとめ
- **「ある」** は固定的な存在や実体を示す概念として扱われる。
- **「なる」** は変化や生成、プロセスを重視する概念として扱われる。
- 哲学の歴史では、パルメニデスやアリストテレスが「ある」を強調し、ヘラクレイトスや仏教、ニーチェ、ドゥルーズが「なる」を重視してきた。

この二つの概念は、単純な対立ではなく、相互補完的な関係として考えるべきかもしれない。
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
            line = "[*** " + line[3:].replace("**", "") + "]"
        elif line.startswith("### "):
            line = "[** " + line[4:].replace("**", "") + "]"
        elif line.startswith("#### "):
            line = "[* " + line[5:].replace("**", "") + "]"
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
