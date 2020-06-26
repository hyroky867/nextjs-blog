import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): {
  id: string;
}[] {
  // posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // id を取得するためにファイル名から 拡張子を削除
    const id = fileName.replace(/\.md$/, '');

    // markdownファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 投稿音メタデータ部分を解析するために gray-matter を利用
    const matterResult = matter(fileContents);

    // データを id と合わせる
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export function getAllPostIds(): {
  params: {
    id: string;
  };
}[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string): Promise<{
  date: string;
  title: string;
  id: string;
  contentHtml: string;
}> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents);

  // マークダウンを HTML 文字列に変換するために remark を使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // データを id および contentHtml と組み合わせる
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}