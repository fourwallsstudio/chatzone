from chatzone import s3

def upload_file_to_s3(file, bucket_name, acl="public-read"):

    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        print('upload error: ', e)
        return e

    url = 'https://s3.amazonaws.com/chatzone-dev/' + file.filename
    return url
